using System.Text;
using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Loan.BLL.DataTransferObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Arbiter.BLL.Services;

public class RequestLoanChargeJob {
    private readonly ArbiterDbContext _dbContext;
    private readonly IOptions<InternalApiQueries> _options;

    public RequestLoanChargeJob(ArbiterDbContext dbContext, IOptions<InternalApiQueries> options) {
        _dbContext = dbContext;
        _options = options;
    }

    public async Task RequestLoanChargeTransactions() {
        var breaker = await _dbContext.CircuitBreaker.FirstOrDefaultAsync();
        if (breaker == null) {
            breaker = new CircuitBreaker();
            _dbContext.Add(breaker);
            await _dbContext.SaveChangesAsync();
        }

        var requests = await _dbContext.ChargeLoanTransactions.Take(100).ToListAsync();

        var wrongLoanRequests = requests.Count != 0 && requests
            .Count(r => r.LoanChargeRetries > 1) >= Math.Ceiling(0.7 * requests.Count);
        var wrongCoreRequests = requests.Count != 0 && requests
            .Count(r => r.CheckAccountRetries > 1
                        || r.AccountLoanChargeRetries > 1) >= Math.Ceiling(0.7 * requests.Count);
        
        if (wrongCoreRequests || wrongLoanRequests) {
            if (wrongLoanRequests && (breaker.LoanTimeout == null ||  breaker.LoanTimeout.Value.AddMinutes(2) <= DateTime.UtcNow))
                breaker.LoanTimeout = DateTime.UtcNow.AddMinutes(2);
            if (wrongCoreRequests && (breaker.CoreTimeout == null || breaker.CoreTimeout.Value.AddMinutes(2) <= DateTime.UtcNow))
                breaker.CoreTimeout = DateTime.UtcNow.AddMinutes(2);
            _dbContext.Update(breaker);
            await _dbContext.SaveChangesAsync();
        }
        HttpClient client = new HttpClient();
        client.DefaultRequestHeaders.Add("XApiKey", Guid.Empty.ToString());
        
        // Проверить существование счета
        if (breaker.CoreTimeout == null || breaker.CoreTimeout <= DateTime.UtcNow)
            foreach (
                var request in requests.Where(r =>
                    r.CheckAccountStatus is TransactionStatus.NotStarted or TransactionStatus.Failure
                )
            ) {
                client.DefaultRequestHeaders.Remove("X-Idempotency-Key");
                client.DefaultRequestHeaders.Add("X-Idempotency-Key", request.IdempotenceKey);

                var response = await client.GetAsync(
                    $"{_options.Value.BaseUrlCore}{_options.Value.BaseCoreController}{request.AccountId}"
                );
                if (response.IsSuccessStatusCode) {
                    request.CheckAccountStatus = TransactionStatus.Success;
                    _dbContext.ChargeLoanTransactions.Update(request);
                    await _dbContext.SaveChangesAsync();
                }
                else {
                    if (request.CheckAccountRetries >= 4) {
                        _dbContext.Remove(request);
                        await _dbContext.SaveChangesAsync();
                    }
                    else {
                        request.CheckAccountStatus = TransactionStatus.Failure;
                        request.CheckAccountRetries++;
                        _dbContext.ChargeLoanTransactions.Update(request);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }

        // Списать деньги со счета
        if (breaker.CoreTimeout == null || breaker.CoreTimeout <= DateTime.UtcNow)
            foreach (
                var request in requests.Where(r =>
                    r
                        is {
                            CheckAccountStatus: TransactionStatus.Success,
                            AccountLoanChargeStatus: TransactionStatus.NotStarted
                            or TransactionStatus.Failure
                        }
                )
            ) {
                client.DefaultRequestHeaders.Remove("X-Idempotency-Key");
                client.DefaultRequestHeaders.Add("X-Idempotency-Key", request.IdempotenceKey);
                var requestBody = new FormUrlEncodedContent(
                    new[] { new KeyValuePair<string, string>("amount", request.Amount.ToString()) }
                );

                var response = await client.PostAsync(
                    $"{_options.Value.BaseUrlCore}{_options.Value.BaseCoreController}{request.AccountId}/transfer/to-master",
                    requestBody
                );

                if (response.IsSuccessStatusCode) {
                    request.AccountLoanChargeStatus = TransactionStatus.Success;
                    _dbContext.ChargeLoanTransactions.Update(request);
                    await _dbContext.SaveChangesAsync();
                }
                else {
                    if (request.AccountLoanChargeRetries >= 4) {
                        _dbContext.Remove(request);
                        await _dbContext.SaveChangesAsync();
                    }
                    else {
                        request.AccountLoanChargeStatus = TransactionStatus.Failure;
                        request.AccountLoanChargeRetries++;
                        _dbContext.ChargeLoanTransactions.Update(request);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }

        // Погасить кредит
        if (breaker.LoanTimeout == null || breaker.LoanTimeout <= DateTime.UtcNow)
            foreach (
                var request in requests.Where(r =>
                    r
                        is {
                            CheckAccountStatus: TransactionStatus.Success,
                            AccountLoanChargeStatus: TransactionStatus.Success,
                            LoanChargeStatus: TransactionStatus.NotStarted or TransactionStatus.Failure
                        }
                )
            ) {
                client.DefaultRequestHeaders.Remove("X-Idempotency-Key");
                client.DefaultRequestHeaders.Add("X-Idempotency-Key", request.IdempotenceKey);
                
                var loanDto = new LoanChargeDto {
                    CurrencyType = request.CurrencyType,
                    LoanId = request.LoanId,
                    Amount = request.Amount
                };

                var jsonDto = JsonConvert.SerializeObject(loanDto);
                var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(
                    $"{_options.Value.BaseUrlLoan}{_options.Value.BaseLoanController}{request.LoanId}/charge",
                    content
                );
                if (response.IsSuccessStatusCode) {
                    request.LoanChargeStatus = TransactionStatus.Success;
                    _dbContext.ChargeLoanTransactions.Remove(request);
                    await _dbContext.SaveChangesAsync();
                }
                else {
                    // Отмена списания со счета

                    if (request.LoanChargeRetries >= 4) {
                        var modificationDto = new AccountModificationDto {
                            Type = OperationType.Withdraw,
                            Reason = OperationReason.Loan,
                            LoanId = request.LoanId,
                            TransactionId = request.Id,
                            Amount = request.Amount,
                            Message = "Отмена списания по кредиту"
                        };

                        var httpRequest = new HttpRequestMessage {
                            Method = HttpMethod.Delete,
                            RequestUri = new Uri(
                                $"{_options.Value.BaseUrlCore}{_options.Value.BaseCoreController}{request.AccountId}/modification"
                            ),
                            Content = new StringContent(
                                JsonConvert.SerializeObject(modificationDto),
                                Encoding.UTF8,
                                "application/json"
                            )
                        };
                        var cancelResponse = await client.SendAsync(httpRequest);
                        if (cancelResponse.IsSuccessStatusCode) {
                            _dbContext.Remove(request);
                            await _dbContext.SaveChangesAsync();
                        }
                    }
                    else {
                        request.LoanChargeStatus = TransactionStatus.Failure;
                        request.LoanChargeRetries++;
                        _dbContext.ChargeLoanTransactions.Update(request);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }
    }
}