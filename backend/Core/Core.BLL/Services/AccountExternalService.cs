using Common.DataTransfer;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Core.DAL;
using Core.DAL.Entities;
using Microsoft.Extensions.Logging;

namespace Core.BLL.Services;

public class AccountExternalService
{
    private readonly CoreDbContext _dbContext;
    private readonly OperationHistorySender _operationHistorySender;
    private readonly AccountBalanceService _accountBalanceService;
    private readonly ILogger<AccountExternalService> _logger;

    public AccountExternalService(
        CoreDbContext dbContext,
        OperationHistorySender operationHistorySender,
        AccountBalanceService accountBalanceService,
        ILogger<AccountExternalService> logger
    )
    {
        _dbContext = dbContext;
        _operationHistorySender = operationHistorySender;
        _accountBalanceService = accountBalanceService;
        _logger = logger;
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
        CheckAccount(account, userId);

        account!.DeletedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
    }

    public async Task<AccountDto> GetAccount(Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account);

        return account!.ToDto();
    }

    public async Task<AccountDto> GetAccount(Guid userId, Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account, userId);

        return account!.ToDto();
    }

    public async Task<List<AccountDto>> GetAccounts(Guid userId, SearchAccountUserDto searchDto)
    {
        var accounts = await _dbContext
            .Accounts.Where(e =>
                e.UserId == userId
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return accounts.Select(account => account.ToDto()).ToList();
    }

    public async Task<List<AccountDto>> GetAccounts(SearchAccountEmployeeDto searchDto)
    {
        var accounts = await _dbContext
            .Accounts.Where(e =>
                (searchDto.UserIds.Count == 0 || searchDto.UserIds.Contains(e.UserId))
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return accounts.Select(account => account.ToDto()).ToList();
    }

    public async Task ModifyAccount(Guid userId, Guid accountId, AccountModificationDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account, userId);

        if (dto.Type == OperationType.Withdraw && account!.Amount - dto.Amount < 0)
        {
            throw new InvalidOperationException("Not enough money on the account");
        }

        await _accountBalanceService.LockAccount(accountId);

        try
        {
            _operationHistorySender.SendOperationHistoryMessage(
                new OperationHistoryMessage
                {
                    UserId = account!.UserId,
                    AccountId = accountId,
                    LoanId = dto.LoanId,
                    TransactionId = dto.TransactionId ?? Guid.NewGuid(),

                    OperationType = dto.Type,
                    OperationReason = dto.Reason,
                    OperationStatus = OperationStatus.Success,

                    Amount = dto.Amount,
                    CurrencyType = account.CurrencyType,

                    DateTime = DateTime.UtcNow,
                    Message = dto.Message
                }
            );
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while sending operation history message");
            await _accountBalanceService.UnlockAccount(accountId);
        }
    }

    private void CheckAccount(Account? account, Guid? userId = null)
    {
        if (account == null)
        {
            throw new InvalidOperationException("Account not found");
        }

        if (userId != null && account.UserId != userId)
        {
            throw new InvalidOperationException("Not enough rights to access the account");
        }
    }
}
