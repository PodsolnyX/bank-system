using Common.DataTransfer;
using Core.BLL.DataTransferObjects;
using Core.DAL;
using Core.DAL.Entities;

namespace Core.BLL.Services;

public class AccountService
{
    private readonly CoreDbContext _dbContext;

    public AccountService(CoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<AccountDto> OpenAccount(Guid userId, OpenAccountDto dto)
    {
        var account = new Account { UserId = userId, CurrencyType = dto.CurrencyType };

        _dbContext.Accounts.Add(account);
        await _dbContext.SaveChangesAsync();

        return await GetAccount(userId, account.Id);
    }

    public async Task CloseAccount(Guid userId, Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        CheckAccount(userId, account);

        account.DeletedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    public async Task<AccountDto> GetAccount(Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        return new AccountDto
        {
            Id = account.Id,
            UserId = account.UserId,
            CurrencyType = account.CurrencyType,
            Amount = account.Amount
        };
    }

    public async Task<AccountDto> GetAccount(Guid userId, Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        CheckAccount(userId, account);

        return new AccountDto
        {
            Id = account.Id,
            UserId = account.UserId,
            CurrencyType = account.CurrencyType,
            Amount = account.Amount
        };
    }

    public async Task<List<AccountDto>> GetAccounts(Guid userId, SearchAccountUserDto searchDto)
    {
        var accounts = await _dbContext
            .Accounts.Where(e =>
                e.UserId == userId
                && !e.DeletedAt.HasValue
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return accounts
            .Select(account => new AccountDto
            {
                Id = account.Id,
                UserId = account.UserId,
                CurrencyType = account.CurrencyType,
                Amount = account.Amount
            })
            .ToList();
    }

    public async Task<List<AccountDto>> GetAccounts(SearchAccountEmployeeDto searchDto)
    {
        var accounts = await _dbContext
            .Accounts.Where(e =>
                !e.DeletedAt.HasValue
                && (searchDto.UserIds.Count == 0 || searchDto.UserIds.Contains(e.UserId))
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return accounts
            .Select(account => new AccountDto
            {
                Id = account.Id,
                UserId = account.UserId,
                CurrencyType = account.CurrencyType,
                Amount = account.Amount
            })
            .ToList();
    }

    public async Task Deposit(Guid userId, Guid accountId, DepositDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        CheckAccount(userId, account);

        account.Amount += dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    public async Task Withdraw(Guid userId, Guid accountId, DepositDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        CheckAccount(userId, account);

        if (account.Amount - dto.Amount < 0)
        {
            // Todo: Specify exception
            throw new Exception();
        }

        account.Amount -= dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    private void CheckAccount(Guid userId, Account? account)
    {
        if (account == null || account.UserId != userId)
        {
            // Todo: Specify exception
            throw new Exception();
        }

        if (account.DeletedAt != null)
        {
            // Todo: Specify exception
            throw new Exception();
        }
    }
}
