using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
using Hangfire;

namespace Arbiter.BLL.Services;

public class RequestLoanChargeService {
    private readonly ArbiterDbContext _dbContext;
    private readonly InternalApiQueries _options;
    private readonly IBackgroundJobClient _backgroundJobClient;

    public RequestLoanChargeService(ArbiterDbContext dbContext, IBackgroundJobClient backgroundJobClient, InternalApiQueries options) {
        _dbContext = dbContext;
        _backgroundJobClient = backgroundJobClient;
        _options = options;
    }
    public async Task RequestLoanCharge(RequestLoanChargeDto dto) {
        var request = new ChargeLoanTransaction {
            UserId = dto.UserId,
            AccountId = dto.AccountId,
            TariffId = dto.TariffId,
            Amount = dto.Amount,
            CurrencyType = dto.CurrencyType
        };
        await _dbContext.AddAsync(request);
        await _dbContext.SaveChangesAsync();
    }
    
}
