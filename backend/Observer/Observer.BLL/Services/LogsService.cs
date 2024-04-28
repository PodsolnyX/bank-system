using Common.Serilog;
using Observer.DAL;
using Observer.DAL.Entities;

namespace Observer.BLL.Services;

public class LogsService
{
    private readonly ObserverDbContext _dbContext;

    public LogsService(ObserverDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task CreateAsync(LogEventEntity log)
    {
        var logEntity = new Log
        {
            MicroserviceName = log.MicroserviceName,
            Level = log.Level,
            TraceId = log.TraceId,
            CreatedAt = log.Timestamp,
            Exception = log.Exception,
            MessageTemplate = log.MessageTemplate,
            Message = log.Message,
            Source = "LOGS",
            Tags = ["Logs", log.MicroserviceName]
        };
        _dbContext.Logs.Add(logEntity);
        await _dbContext.SaveChangesAsync();
    }
}
