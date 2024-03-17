using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AuthorizationServer.BLL.Extensions;

public static class OpenIddictExtension
{
    public static IServiceCollection AddConfiguredOpenIddict(this IServiceCollection services)
    {
        services
            .AddOpenIddict()
            .AddCore(options =>
            {
                options.UseEntityFrameworkCore().UseDbContext<IdentityDbContext>();
            })
            .AddServer(options =>
            {
                options
                    .AllowAuthorizationCodeFlow()
                    .RequireProofKeyForCodeExchange()
                    .AllowClientCredentialsFlow()
                    .AllowRefreshTokenFlow();

                options
                    .SetAuthorizationEndpointUris("/connect/authorize")
                    .SetTokenEndpointUris("/connect/token")
                    .SetUserinfoEndpointUris("/connect/userinfo");

                options.RegisterScopes("api");

                options
                    .UseAspNetCore()
                    .DisableTransportSecurityRequirement()
                    .EnableTokenEndpointPassthrough()
                    .EnableAuthorizationEndpointPassthrough()
                    .EnableUserinfoEndpointPassthrough();

                options
                    .AddSigningKey(new RsaSecurityKey(RSA.Create(2048)))
                    .AddEncryptionKey(new RsaSecurityKey(RSA.Create(2048)))
                    .DisableAccessTokenEncryption();
            });

        return services;
    }
}
