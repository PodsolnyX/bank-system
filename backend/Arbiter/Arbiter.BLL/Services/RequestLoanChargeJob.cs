using System.Text;
using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
using Core.BLL.DataTransferObjects;
using Loan.BLL.DataTransferObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using LoanChargeDto = Core.BLL.DataTransferObjects.LoanChargeDto;

namespace Arbiter.BLL.Services;

public class RequestLoanChargeJob {
    private readonly ArbiterDbContext _dbContext;
    private readonly IOptions<InternalApiQueries> _options;

    public RequestLoanChargeJob(ArbiterDbContext dbContext, IOptions<InternalApiQueries> options) {
        _dbContext = dbContext;
        _options = options;
    }

    public async Task RequestLoanChargeTransactions() {
        var requests = await _dbContext.ChargeLoanTransactions
            .Take(100)
            .ToListAsync();
        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri(_options.Value.BaseUrlCore);
        client.DefaultRequestHeaders.Add("XApiKey", Guid.Empty.ToString());
        // Проверить существование счета
        foreach (var request in requests.Where(r=>
                     r.CheckAccountStatus is TransactionStatus.NotStarted or TransactionStatus.Failure)) {
           var response = await client.GetAsync($"{_options.Value.BaseCoreController}{request.AccountId}");
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
        foreach (var request in requests.Where(r=>
                     r is { CheckAccountStatus: TransactionStatus.Success, 
                         AccountLoanChargeStatus: TransactionStatus.NotStarted or TransactionStatus.Failure } )) {
            var loanDto = new LoanChargeDto {
                LoanId = request.LoanId,
                Amount = request.Amount
            };
            var jsonDto = JsonConvert.SerializeObject(loanDto);
            var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
           var response = await client.PostAsync($"{_options.Value.BaseUrlCore}/{request.AccountId}/loan-charge", 
               content);

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
        foreach (var request in requests.Where(r=>
                     r is { CheckAccountStatus: TransactionStatus.Success, 
                         AccountLoanChargeStatus: TransactionStatus.Success,
                         LoanChargeStatus: TransactionStatus.NotStarted or TransactionStatus.Failure
                     } )) {
            var loanDto = new LoanIncomeDto {
                LoanId = request.LoanId,
                Amount = request.Amount
            };
            var jsonDto = JsonConvert.SerializeObject(loanDto);
            var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
            
            var response = await client.PostAsync($"{_options.Value.BaseLoanController}{request.AccountId}/charge",
                content);
            if (response.IsSuccessStatusCode) {
                request.LoanChargeStatus = TransactionStatus.Success;
                _dbContext.ChargeLoanTransactions.Remove(request);
                await _dbContext.SaveChangesAsync();
            }
            else {
                if (request.LoanChargeRetries >= 4) {
                    var cancelResponse = await client.DeleteAsync($"{_options.Value.BaseCoreController}" +
                                                            $"/accountId/{request.AccountId}?LoanId={request.LoanId}&Amount={request.Amount}");
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