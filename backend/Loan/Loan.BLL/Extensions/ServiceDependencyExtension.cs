using Loan.BLL.Services;
using Loan.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
        this IServiceCollection services
    )
    {
        services.AddScoped<LoanService>();
        services.AddScoped<LoanInternalService>();
        services.AddScoped<TariffService>();
        return services;
    }
}