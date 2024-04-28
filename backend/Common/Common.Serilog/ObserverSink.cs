using System.Net.Http.Json;
using System.Reflection;
using Microsoft.Extensions.Hosting;
using Serilog.Core;
using Serilog.Events;

namespace Common.Serilog;

public class ObserverSink : ILogEventSink
{
    public void Emit(LogEvent logEvent)
    {
        IHostEnvironment? env =
            Host.CreateDefaultBuilder().Build().Services.GetService(typeof(IHostEnvironment))
            as IHostEnvironment;

        var entity = new LogEventEntity
        {
            MicroserviceName = env?.ApplicationName ?? "Unknown",
            Level = logEvent.Level.ToString(),
            TraceId = logEvent.TraceId.ToString()!,
            Timestamp = logEvent.Timestamp,
            Exception = logEvent.Exception?.ToString(),
            MessageTemplate = logEvent.MessageTemplate.Text,
            Message = logEvent.RenderMessage()
        };

        using var httpClient = new HttpClient();

        try
        {
            httpClient
                .PostAsJsonAsync("http://observer:8080/logs", entity)
                .GetAwaiter()
                .GetResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}
