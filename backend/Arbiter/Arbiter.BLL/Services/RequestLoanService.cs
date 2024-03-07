using System.Net.Http.Headers;
using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
using Common.Enum;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Arbiter.BLL.Services;

public class RequestLoanService {
    private readonly ArbiterDbContext _dbContext;
    private readonly InternalApiQueries _options;
    private readonly IBackgroundJobClient _backgroundJobClient;

    public RequestLoanService(ArbiterDbContext dbContext, IOptions<InternalApiQueries> options, IBackgroundJobClient backgroundJobClient) {
        _dbContext = dbContext;
        _backgroundJobClient = backgroundJobClient;
        _options = options.Value;
    }
    public async Task RequestLoan(RequestLoanDto dto) {
        var request = new RequestLoanTransaction {
            UserId = dto.UserId,
            AccountId = dto.AccountId,
            TariffId = dto.TariffId,
            Amount = dto.Amount,
            CurrencyType = dto.CurrencyType
        };
        await _dbContext.AddAsync(request);
        await _dbContext.SaveChangesAsync();
    }
    public async Task RequestLoanTransactions(RequestLoanDto dto) {
        var requests = await _dbContext.RequestLoanTransactions
            .Take(100)
            .ToListAsync();
        HttpClient client = new HttpClient();
        client.BaseAddress = new Uri(_options.BaseUrlCore);
        client.DefaultRequestHeaders.Add("XApiKey", Guid.Empty.ToString());
        foreach (var request in requests) {
           var response = await client.GetAsync($"{_options.BaseCoreController}{request.AccountId}");
           if (response.IsSuccessStatusCode) {
               request.CheckAccountStatus = TransactionStatus.Success;
               _dbContext.RequestLoanTransactions.Update(request);
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
}