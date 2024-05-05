using System.Text;
using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Hangfire;
using Loan.BLL.DataTransferObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Arbiter.BLL.Services;

public class RequestLoanJob {
    private readonly ArbiterDbContext _dbContext;
    private readonly IOptions<InternalApiQueries> _options;

    public RequestLoanJob(IOptions<InternalApiQueries> options, ArbiterDbContext dbContext) {
        _options = options;
        _dbContext = dbContext;
    }

    public async Task RequestLoanTransactions() {
        var breaker = await _dbContext.CircuitBreaker.FirstOrDefaultAsync();
        if (breaker == null) {
            breaker = new CircuitBreaker();
            _dbContext.Add(breaker);
            await _dbContext.SaveChangesAsync();
        }
        var requests = await _dbContext.RequestLoanTransactions.Take(100).ToListAsync();
        var wrongLoanRequests = requests.Count != 0 && requests 
            .Count(r => r.TakeLoanRetries > 1) >= Math.Ceiling(0.7 * requests.Count);
        var wrongCoreRequests = requests.Count != 0 && requests
            .Count(r => r.AccountLoanIncomeRetries > 1
                        || r.CheckAccountRetries > 1) >= Math.Ceiling(0.7 * requests.Count);
        
        if (wrongCoreRequests || wrongLoanRequests) {
            if (wrongLoanRequests && (breaker.LoanTimeout == null ||  breaker.LoanTimeout.Value.AddMinutes(4) <= DateTime.UtcNow))
                breaker.LoanTimeout = DateTime.UtcNow.AddMinutes(2);
            if (wrongCoreRequests && (breaker.CoreTimeout == null || breaker.CoreTimeout.Value.AddMinutes(4) <= DateTime.UtcNow))
                breaker.CoreTimeout = DateTime.UtcNow.AddMinutes(2);
            _dbContext.Update(breaker);
            await _dbContext.SaveChangesAsync();
        }

        var client = new HttpClient();

        client.DefaultRequestHeaders.Add("XApiKey", Guid.Empty.ToString());
        // Проверить статус
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
                    _dbContext.RequestLoanTransactions.Update(request);
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
                        _dbContext.RequestLoanTransactions.Update(request);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }

        // Взять кредит
        if (breaker.LoanTimeout == null || breaker.LoanTimeout <= DateTime.UtcNow)
            foreach (
                var request in requests.Where(r =>
                    r
                        is {
                            CheckAccountStatus: TransactionStatus.Success,
                            TakeLoanStatus: TransactionStatus.NotStarted or TransactionStatus.Failure
                        }
                )
            ) {
                client.DefaultRequestHeaders.Remove("X-Idempotency-Key");
                client.DefaultRequestHeaders.Add("X-Idempotency-Key", request.IdempotenceKey);
                
                var loanDto = new TakeLoanDto {
                    UserId = request.UserId,
                    AccountId = request.AccountId,
                    TariffId = request.TariffId,
                    Amount = request.Amount,
                    CurrencyType = request.CurrencyType
                };

                var jsonDto = JsonConvert.SerializeObject(loanDto);
                var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(
                    $"{_options.Value.BaseUrlLoan}{_options.Value.BaseLoanController}take",
                    content
                );

                if (response.IsSuccessStatusCode) {
                    request.TakeLoanStatus = TransactionStatus.Success;
                    request.LoanId = Guid.Parse((await response.Content.ReadAsStringAsync())[1..^1]);
                    _dbContext.RequestLoanTransactions.Update(request);
                    await _dbContext.SaveChangesAsync();
                }
                else {
                    if (request.TakeLoanRetries >= 4) {
                        _dbContext.Remove(request);
                        await _dbContext.SaveChangesAsync();
                    }
                    else {
                        request.TakeLoanStatus = TransactionStatus.Failure;
                        request.TakeLoanRetries++;
                        _dbContext.RequestLoanTransactions.Update(request);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }

        // Начислить деньги
        if (breaker.CoreTimeout == null || breaker.CoreTimeout <= DateTime.UtcNow)
            foreach (
                var request in requests.Where(r =>
                    r
                        is {
                            CheckAccountStatus: TransactionStatus.Success,
                            TakeLoanStatus: TransactionStatus.Success,
                            AccountLoanIncomeStatus: TransactionStatus.NotStarted
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
                    $"{_options.Value.BaseUrlCore}{_options.Value.BaseCoreController}{request.AccountId}/transfer/from-master",
                    requestBody
                );

                if (response.IsSuccessStatusCode) {
                    request.AccountLoanIncomeStatus = TransactionStatus.Success;
                    _dbContext.RequestLoanTransactions.Remove(request);
                    await _dbContext.SaveChangesAsync();
                }
                else {
                    if (request.AccountLoanIncomeRetries >= 4) {
                        // Отменить взятие кредита
                        var cancelResponse = await client.DeleteAsync(
                            $"{_options.Value.BaseUrlLoan}{_options.Value.BaseLoanController}{request.LoanId}/take-cancel"
                        );
                        if (cancelResponse.IsSuccessStatusCode) {
                            _dbContext.Remove(request);
                            await _dbContext.SaveChangesAsync();
                        }
                    }
                    else {
                        request.AccountLoanIncomeStatus = TransactionStatus.Failure;
                        request.AccountLoanIncomeRetries++;
                        _dbContext.RequestLoanTransactions.Update(request);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }
    }
}