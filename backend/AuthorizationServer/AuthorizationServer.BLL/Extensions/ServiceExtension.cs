using AuthorizationServer.BLL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AuthorizationServer.BLL.Extensions;

public static class ServiceExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<UserService>();
        services.AddScoped<RoleService>();
        return services;
    }
}
