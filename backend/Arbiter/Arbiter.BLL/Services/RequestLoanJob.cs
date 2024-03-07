using System.Text;
using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
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
        var requests = await _dbContext.RequestLoanTransactions
            .Take(100)
            .ToListAsync();
        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri(_options.Value.BaseUrlCore);
        client.DefaultRequestHeaders.Add("XApiKey", Guid.Empty.ToString());
        // Проверить статус
        foreach (var request in requests.Where(r=>
                     r.CheckAccountStatus is TransactionStatus.NotStarted or TransactionStatus.Failure)) {
           var response = await client.GetAsync($"{_options.Value.BaseCoreController}{request.AccountId}");
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
        foreach (var request in requests.Where(r=>
                     r is { CheckAccountStatus: TransactionStatus.Success, 
                         TakeLoanStatus: TransactionStatus.NotStarted or TransactionStatus.Failure } )) {
            var loanDto = new TakeLoanDto {
                UserId = request.UserId,
                AccountId = request.AccountId,
                TariffId = request.TariffId,
                Amount = request.Amount,
                CurrencyType = request.CurrencyType
            };
            var jsonDto = JsonConvert.SerializeObject(loanDto);
            var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
           var response = await client.PostAsync($"{_options.Value.BaseLoanController}/take", 
               content);

           if (response.IsSuccessStatusCode) {
               request.TakeLoanStatus = TransactionStatus.Success;
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
        foreach (var request in requests.Where(r=>
                     r is { CheckAccountStatus: TransactionStatus.Success, 
                         TakeLoanStatus: TransactionStatus.Success,
                         AccountLoanIncomeStatus: TransactionStatus.NotStarted or TransactionStatus.Failure
                     } )) {
            var loanDto = new LoanIncomeDto {
                LoanId = request.LoanId,
                Amount = request.Amount
            };
            var jsonDto = JsonConvert.SerializeObject(loanDto);
            var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
            
            var response = await client.PostAsync($"{_options.Value.BaseCoreController}{request.AccountId}/loan-income",
                content);
            if (response.IsSuccessStatusCode) {
                request.AccountLoanIncomeStatus = TransactionStatus.Success;
                _dbContext.RequestLoanTransactions.Remove(request);
                await _dbContext.SaveChangesAsync();
            }
            else {
                if (request.TakeLoanRetries >= 4) {
                    // Отменить взятие кредита
                    var cancelResponse = await client.DeleteAsync($"{_options.Value.BaseLoanController}/loanId/{request.AccountId}");
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