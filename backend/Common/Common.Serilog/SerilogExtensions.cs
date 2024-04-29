using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace Common.Serilog;

public static class SerilogExtensions
{
    public static void ConfigureSerilog(this ILoggingBuilder builder, bool sentToObserver = true)
    {
        IHostEnvironment? env =
            Host.CreateDefaultBuilder().Build().Services.GetService(typeof(IHostEnvironment))
            as IHostEnvironment;
        var solutionName = env?.ApplicationName ?? "Unknown";

        var loggerBuilder = new LoggerConfiguration()
            .MinimumLevel.Information()
            .WriteTo.Console()
            .WriteTo.File($"logs/{solutionName}-log.txt", rollingInterval: RollingInterval.Day)
            .WriteTo.Debug()
            .Enrich.FromLogContext();

        if (sentToObserver)
        {
            loggerBuilder.WriteTo.Sink<ObserverSink>();
        }

        builder.ClearProviders();
        builder.AddSerilog(loggerBuilder.CreateLogger());
    }
}
