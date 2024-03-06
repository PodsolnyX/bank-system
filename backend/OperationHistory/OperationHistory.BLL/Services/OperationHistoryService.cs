using Common.DataTransfer;
using Common.Enum;
using Core.BLL.DataTransferObjects;
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
        var entity = new Operation()
        {
            Id = message.Id,
            UserId = message.UserId,
            AccountId = message.AccountId,
            LoanId = message.LoanId,
            CurrencyType = message.CurrencyType,
            Type = message.OperationType,
            Status = message.OperationStatus,
            Amount = message.Amount,
            Message = message.Message,
            DateTime = message.DateTime
        };
        await _dbContext.Operations.AddAsync(entity);
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

        var operationSum = await _dbContext
            .Operations.Where(x => x.AccountId == accountId)
            .SumAsync(x => x.Amount * (x.Type == OperationType.Deposit ? 1 : -1));

        var balance = operationAggregation?.CalculatedAmount ?? 0 + operationSum;

        await _accountBalanceSender.SendCoreAccountBalanceMessage(
            new UpdateAccountBalanceMessage
            {
                AccountId = accountId,
                Amount = balance,
                DateTime = DateTime.UtcNow
            }
        );
    }
}
