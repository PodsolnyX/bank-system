using Hangfire;
using Hangfire.PostgreSql;
using Loan.BLL.Services;
using Loan.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Observer.BLL.Configuration;

namespace Loan.BLL.Extensions;

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
        services.AddDbContext<LoanDbContext>(options =>
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
        services.AddScoped<LoanService>();
        services.AddScoped<LoanInternalService>();
        services.AddScoped<TariffService>();
        services.AddScoped<PaymentService>();
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