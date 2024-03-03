using Common.DataTransfer;
using Core.BLL.DataTransferObjects;
using Core.DAL;
using Core.DAL.Entities;

namespace Core.BLL.Services;

public class AccountInternalService
{
    private readonly CoreDbContext _dbContext;

    public AccountInternalService(CoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task LoanCharge(Guid accountId, LoanChargeDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        if (account.Amount - dto.Amount < 0)
        {
            // Todo: Specify exception
            throw new Exception();
        }

        account.Amount -= dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    public async Task LoanChargeCancel(Guid accountId, LoanChargeDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        account.Amount += dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    public async Task LoanIncome(Guid accountId, LoanIncomeDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        account.Amount += dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }
}
