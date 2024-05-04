using Arbiter.BLL.Services;
using Arbiter.DAL;
using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Observer.BLL.Configuration;

namespace Arbiter.BLL.Extensions;

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
        services.AddDbContext<ArbiterDbContext>(options =>
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
        services.Configure<ObserverOptions>(configuration.GetSection("Observer"));
        services.AddScoped<RequestLoanService>();
        services.AddScoped<RequestLoanChargeService>();
        services.AddHangfireServer();
        services.AddHangfire(x =>
            x.UsePostgreSqlStorage(
                s =>
                {
                    s.UseNpgsqlConnection(configuration.GetConnectionString("Database"));
                },
                new PostgreSqlStorageOptions()
                {
                    DistributedLockTimeout = TimeSpan.FromSeconds(1),
                    PrepareSchemaIfNecessary = true,
                }
            )
        );
        return services;
    }
}