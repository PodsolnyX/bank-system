using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.Abstractions;

namespace AuthorizationServer.BLL.Services;

internal class ClientSeeder : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public ClientSeeder(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();

        var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

        if (await manager.FindByClientIdAsync("client", cancellationToken) is null)
        {
            await manager.CreateAsync(
                new OpenIddictApplicationDescriptor
                {
                    ClientId = "client",
                    ClientSecret = "client-secret",
                    DisplayName = "Client",
                    RedirectUris =
                    {
                        new Uri("https://coto-dev.ru/account/login"),
                        new Uri("https://coto-dev.ru/swagger/oauth2-redirect.html"),
                        new Uri("https://localhost/account/login"),
                        new Uri("https://localhost:7005/swagger/oauth2-redirect.html"),
                        new Uri("http://coto-dev.ru/account/login"),
                        new Uri("http://coto-dev.ru/swagger/oauth2-redirect.html"),
                        new Uri("http://localhost/account/login"),
                        new Uri("http://localhost:7005/swagger/oauth2-redirect.html"),
                        new Uri("http://localhost:5173"),
                        new Uri("http://192.168.1.6:80"),
                        new Uri("http://localhost:80"),
                    },
                    Permissions =
                    {
                        OpenIddictConstants.Permissions.Endpoints.Authorization,
                        OpenIddictConstants.Permissions.Endpoints.Token,
                        OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
                        OpenIddictConstants.Permissions.GrantTypes.ClientCredentials,
                        OpenIddictConstants.Permissions.GrantTypes.RefreshToken,
                        OpenIddictConstants.Permissions.Prefixes.Scope + "api",
                        OpenIddictConstants.Permissions.ResponseTypes.Code,
                        OpenIddictConstants.Permissions.Scopes.Roles
                    }
                },
                cancellationToken
            );
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
