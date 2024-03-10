using Common.Enum;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OperationHistory.DAL;
using OperationHistory.DAL.Entities;

namespace OperationHistory.BLL.Jobs;

public class CalculateOperationAggregationJob
{
    private readonly OpHistoryDbContext _dbContext;
    private readonly ILogger<CalculateOperationAggregationJob> _logger;

    public CalculateOperationAggregationJob(
        ILogger<CalculateOperationAggregationJob> logger,
        OpHistoryDbContext dbContext
    )
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    public async Task Execute()
    {
        _logger.LogInformation("Start {JobName}", nameof(CalculateOperationAggregationJob));

        try
        {
            var notAggregated = await _dbContext
                .Operations.Where(operation =>
                    (operation.ModifiedAt ?? operation.CreatedAt) < DateTime.UtcNow.AddDays(-1)
                    && operation.Status == OperationStatus.Success
                    && (
                        _dbContext.OperationAggregations.FirstOrDefault(aggregation =>
                            aggregation.AccountId == operation.AccountId
                        ) == null
                        || _dbContext
                            .OperationAggregations.FirstOrDefault(aggregation =>
                                aggregation.AccountId == operation.AccountId
                            )!
                            .LastOperationDate < operation.CreatedAt
                    )
                )
                .ToListAsync();

            foreach (var operation in notAggregated)
            {
                var aggregation = await _dbContext
                    .OperationAggregations.OrderBy(e => e.ModifiedAt ?? e.CreatedAt)
                    .FirstOrDefaultAsync(e => e.AccountId == operation.AccountId);

                if (aggregation == null)
                {
                    aggregation = new OperationAggregation
                    {
                        AccountId = operation.AccountId,
                        UserId = operation.UserId,

                        CurrencyType = operation.CurrencyType,
                        CalculatedAmount = operation.Amount,

                        LastOperationDate = operation.ModifiedAt ?? operation.CreatedAt,
                        CreatedAt = DateTime.UtcNow,
                        ModifiedAt = DateTime.UtcNow,
                    };
                    _dbContext.OperationAggregations.Add(aggregation);
                }
                else
                {
                    aggregation.CalculatedAmount +=
                        operation.Amount * (operation.Type == OperationType.Deposit ? 1 : -1);
                    aggregation.LastOperationDate = operation.ModifiedAt ?? operation.CreatedAt;
                    aggregation.ModifiedAt = operation.CreatedAt;
                }

                await _dbContext.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            _logger.LogError(
                e,
                "Error while executing {JobName}",
                nameof(CalculateOperationAggregationJob)
            );
        }

        _logger.LogInformation("Finish {JobName}", nameof(CalculateOperationAggregationJob));
    }
}
