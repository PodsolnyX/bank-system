using Core.BLL.Services;
using Core.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.BLL.Extensions;

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
        services.AddDbContext<CoreDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Database"))
        );
        services.AddScoped<AccountExternalService>();
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
        services.AddScoped<AccountExternalService>();
        services.AddScoped<AccountInternalService>();
        services.AddScoped<AccountBalanceService>();
        services.AddScoped<OperationHistorySender>();
        services.AddScoped<CurrencyTransferService>();
        services.AddHostedService<RabbitMqListenerService>();
        return services;
    }
}
