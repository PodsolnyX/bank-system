using Common.DataTransfer;
using Common.Enum;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using OperationHistory.DAL;
using OperationHistory.DAL.Entities;

namespace OperationHistory.BLL.Services;

public class OperationHistoryService
{
    private readonly OpHistoryDbContext _dbContext;
    private readonly IBackgroundJobClient _backgroundJobClient;
    private readonly CoreAccountBalanceSender _accountBalanceSender;

    public OperationHistoryService(
        OpHistoryDbContext dbContext,
        IBackgroundJobClient backgroundJobClient,
        CoreAccountBalanceSender accountBalanceSender
    )
    {
        _dbContext = dbContext;
        _backgroundJobClient = backgroundJobClient;
        _accountBalanceSender = accountBalanceSender;
    }

    public async Task AddOperationHistory(OperationHistoryMessage message)
    {
        var existingOperation = await _dbContext
            .Operations.OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync(x =>
                x.AccountId == message.AccountId
                && x.TransactionId == message.TransactionId
                && x.Status == OperationStatus.Success
            );

        if (message.OperationStatus == OperationStatus.Failure && existingOperation != null)
        {
            existingOperation.Status = OperationStatus.Failure;
            existingOperation.ModifiedAt = DateTime.UtcNow;
        }
        else
        {
            var entity = new Operation()
            {
                UserId = message.UserId,
                AccountId = message.AccountId,
                LoanId = message.LoanId,
                TransactionId = message.TransactionId,

                Type = message.OperationType,
                Reason = message.OperationReason,
                Status = message.OperationStatus,

                CurrencyType = message.CurrencyType,
                Amount = message.Amount,

                CreatedAt = DateTime.UtcNow,
                Message = message.Message
            };
            _dbContext.Operations.Add(entity);
        }

        await _dbContext.SaveChangesAsync();
    }

    public void EnqueueUpdateAccountBalance(Guid accountId)
    {
        _backgroundJobClient.Enqueue(() => UpdateAccountBalance(accountId));
    }

    public async Task UpdateAccountBalance(Guid accountId)
    {
        var operationAggregation = await _dbContext.OperationAggregations.FirstOrDefaultAsync(x =>
            x.AccountId == accountId
        );

        var date = operationAggregation?.LastOperationDate ?? DateTime.MinValue;

        var operationSum = await _dbContext
            .Operations.Where(x =>
                x.AccountId == accountId
                && x.Status == OperationStatus.Success
                && (x.ModifiedAt ?? x.CreatedAt) > date
            )
            .SumAsync(x => x.Amount * (x.Type == OperationType.Deposit ? 1 : -1));

        var balance = (operationAggregation?.CalculatedAmount ?? 0) + operationSum;

        _accountBalanceSender.SendCoreAccountBalanceMessage(
            new UpdateAccountBalanceMessage
            {
                AccountId = accountId,
                Amount = balance,
                DateTime = DateTime.UtcNow
            }
        );
    }
}
