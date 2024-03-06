using Common.DataTransfer;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Core.DAL;

namespace Core.BLL.Services;

public class AccountInternalService
{
    private readonly CoreDbContext _dbContext;
    private readonly OperationHistorySender _operationHistorySender;

    public AccountInternalService(
        CoreDbContext dbContext,
        OperationHistorySender operationHistorySender
    )
    {
        _dbContext = dbContext;
        _operationHistorySender = operationHistorySender;
    }

    public async Task LoanCharge(Guid accountId, LoanChargeDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        if (account!.Amount - dto.Amount < 0)
        {
            // Todo: Specify exception
            throw new Exception();
        }

        account.Amount -= dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        await _operationHistorySender.SendOperationHistoryMessage(
            new OperationHistoryMessage
            {
                UserId = account.UserId,
                AccountId = accountId,
                Amount = dto.Amount,
                OperationType = OperationType.LoanCharge,
                CurrencyType = account.CurrencyType,
                OperationStatus = OperationStatus.Success,
                DateTime = DateTime.UtcNow,
                Message = "Loan charge operation"
            }
        );
    }

    public async Task LoanChargeCancel(Guid accountId, LoanChargeDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        account.Amount += dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        await _operationHistorySender.SendOperationHistoryMessage(
            new OperationHistoryMessage
            {
                UserId = account.UserId,
                AccountId = accountId,
                Amount = dto.Amount,
                OperationType = OperationType.LoanCharge,
                CurrencyType = account.CurrencyType,
                OperationStatus = OperationStatus.Failure,
                DateTime = DateTime.UtcNow,
                Message = "Loan charge operation cancel"
            }
        );
    }

    public async Task LoanIncome(Guid accountId, LoanIncomeDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        account.Amount += dto.Amount;
        account.ModifiedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        await _operationHistorySender.SendOperationHistoryMessage(
            new OperationHistoryMessage
            {
                UserId = account.UserId,
                AccountId = accountId,
                Amount = dto.Amount,
                OperationType = OperationType.LoanIncome,
                CurrencyType = account.CurrencyType,
                OperationStatus = OperationStatus.Success,
                DateTime = DateTime.UtcNow,
                Message = "Loan income operation"
            }
        );
    }
}
