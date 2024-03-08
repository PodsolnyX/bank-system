using Common.DataTransfer;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Core.DAL;

namespace Core.BLL.Services;

public class AccountInternalService
{
    private readonly CoreDbContext _dbContext;
    private readonly OperationHistorySender _operationHistorySender;
    private readonly AccountBalanceService _accountBalanceService;

    public AccountInternalService(
        CoreDbContext dbContext,
        OperationHistorySender operationHistorySender,
        AccountBalanceService accountBalanceService
    )
    {
        _dbContext = dbContext;
        _operationHistorySender = operationHistorySender;
        _accountBalanceService = accountBalanceService;
    }

    public async Task ModifyAccount(Guid accountId, AccountModificationDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        if (dto.Type == OperationType.Withdraw && account!.Amount - dto.Amount < 0)
        {
            throw new InvalidOperationException("Not enough money on the account");
        }

        await _accountBalanceService.LockAccount(accountId);

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

    public async Task ModifyAccountCancel(Guid accountId, AccountModificationDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        if (dto.Type == OperationType.Deposit && account!.Amount - dto.Amount < 0)
        {
            throw new InvalidOperationException("Not enough money on the account");
        }

        await _accountBalanceService.LockAccount(accountId);

        _operationHistorySender.SendOperationHistoryMessage(
            new OperationHistoryMessage
            {
                UserId = account!.UserId,
                AccountId = accountId,
                LoanId = dto.LoanId,
                TransactionId = dto.TransactionId ?? Guid.NewGuid(),

                OperationType = dto.Type,
                OperationReason = dto.Reason,
                OperationStatus = OperationStatus.Failure,

                Amount = dto.Amount,
                CurrencyType = account.CurrencyType,

                DateTime = DateTime.UtcNow,
                Message = dto.Message
            }
        );
    }
}
