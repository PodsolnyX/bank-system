using AuthorizationServer.BLL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AuthorizationServer.BLL.Extensions;

public static class ClientSeederExtensions
{
    public static IServiceCollection AddClientSeeder(this IServiceCollection services)
    {
        services.AddHostedService<ClientSeeder>();
        return services;
    }
}
