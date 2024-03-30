using System.Net.Http.Headers;
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
using RequestLoanDto = Arbiter.BLL.DataTransferObjects.RequestLoanDto;

namespace Arbiter.BLL.Services;

public class RequestLoanService
{
    private readonly ArbiterDbContext _dbContext;

    public RequestLoanService(ArbiterDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task RequestLoan(RequestLoanDto dto)
    {
        var request = new RequestLoanTransaction
        {
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
