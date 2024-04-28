using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Observer.BLL.Services;
using Observer.DAL;

namespace Observer.BLL.Extensions;

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
        services.AddDbContext<ObserverDbContext>(options =>
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
        services.AddScoped<HttpRequestService>();
        services.AddScoped<LogsService>();
        return services;
    }
}
