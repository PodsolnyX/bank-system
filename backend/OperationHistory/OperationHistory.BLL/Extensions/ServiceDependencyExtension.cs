using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OperationHistory.BLL.Services;
using OperationHistory.DAL;

namespace OperationHistory.BLL.Extensions;

public static class ServiceDependencyExtension
{
    /// <summary>
    /// Add Backend BLL database dependencies
    /// </summary>
    public static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddDbContext<OpHistoryDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Database"))
        );
        return services;
    }

    /// <summary>
    /// Add Backend BLL service dependencies
    /// </summary>
    public static IServiceCollection AddServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddScoped<OperationHistoryReaderService>();
        services.AddScoped<OperationHistoryService>();
        services.AddScoped<CoreAccountBalanceSender>();
        services.AddHostedService<RabbitMqListenerService>();
        services.AddHangfireServer();
        services.AddHangfire(x =>
            x.UsePostgreSqlStorage(
                s =>
                {
                    s.UseNpgsqlConnection(configuration.GetConnectionString("Database"));
                },
                new PostgreSqlStorageOptions()
                {
                    DistributedLockTimeout = TimeSpan.FromSeconds(20),
                    PrepareSchemaIfNecessary = true,
                }
            )
        );
        return services;
    }
}
