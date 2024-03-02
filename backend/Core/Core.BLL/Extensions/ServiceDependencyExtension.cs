using Core.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.BLL.Extensions;

public static class ServiceDependencyExtension {
    /// <summary>
    /// Add Backend BLL service dependencies
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration) {
        services.AddDbContext<CoreDbContext>(options => 
            options.UseNpgsql(configuration.GetConnectionString("Database")));
        return services;
    }
}