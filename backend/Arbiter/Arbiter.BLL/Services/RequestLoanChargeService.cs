using Arbiter.BLL.DataTransferObjects;
using Arbiter.DAL;
using Arbiter.DAL.Entities;
using Hangfire;
using Microsoft.Extensions.Options;

namespace Arbiter.BLL.Services;

public class RequestLoanChargeService
{
    private readonly ArbiterDbContext _dbContext;
    private readonly IOptions<InternalApiQueries> _options;
    private readonly IBackgroundJobClient _backgroundJobClient;

    public RequestLoanChargeService(
        ArbiterDbContext dbContext,
        IBackgroundJobClient backgroundJobClient,
        IOptions<InternalApiQueries> options
    )
    {
        _dbContext = dbContext;
        _backgroundJobClient = backgroundJobClient;
        _options = options;
    }

    public async Task RequestLoanCharge(RequestLoanChargeDto dto)
    {
        var request = new ChargeLoanTransaction
        {
            UserId = dto.UserId,
            LoanId = dto.LoanId,
            AccountId = dto.AccountId,
            TariffId = dto.TariffId,
            Amount = dto.Amount,
            CurrencyType = dto.CurrencyType
        };
        await _dbContext.AddAsync(request);
        await _dbContext.SaveChangesAsync();
    }
}
