using Auth.BLL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Auth.BLL.Extensions;

public static class ServiceDependencyExtension {
    /// <summary>
    /// Add Auth BLL service dependencies
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddBllServicesDependency(
        this IServiceCollection services
    )
    {
        services.AddScoped<UserService>();
        return services;
    }
}