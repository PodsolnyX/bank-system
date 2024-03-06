using Common.DataTransfer;
using Core.DAL;
using Microsoft.Extensions.Logging;

namespace Core.BLL.Services;

public class AccountBalanceService
{
    private readonly CoreDbContext _dbContext;
    private readonly ILogger<AccountBalanceService> _logger;

    public AccountBalanceService(CoreDbContext dbContext, ILogger<AccountBalanceService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task LockAccount(Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        if (account == null)
        {
            throw new InvalidOperationException("Account not found");
        }
        if (account.IsLockedForTransaction)
        {
            throw new InvalidOperationException("Account is locked for transaction");
        }

        account.IsLockedForTransaction = true;
        await _dbContext.SaveChangesAsync();
    }

    public async Task UnlockAccount(Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        if (account == null)
        {
            throw new InvalidOperationException("Account not found");
        }
        if (!account.IsLockedForTransaction)
        {
            throw new InvalidOperationException("Account is not locked for transaction");
        }

        account.IsLockedForTransaction = false;
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAccountBalance(UpdateAccountBalanceMessage message)
    {
        _logger.LogInformation("Updating account balance");
        var account = await _dbContext.Accounts.FindAsync(message.AccountId);
        if (account == null)
        {
            throw new InvalidOperationException("Account not found");
        }
        if (account.ModifiedAt > message.DateTime)
        {
            throw new InvalidOperationException("Account has been modified");
        }

        account.Amount = message.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        await UnlockAccount(message.AccountId);
    }
}
