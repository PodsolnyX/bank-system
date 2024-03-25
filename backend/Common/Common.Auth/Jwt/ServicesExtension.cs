using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Common.Auth.Jwt;

public static class ServicesExtension
{
    public static IServiceCollection AddJwtAuthorization(this IServiceCollection services)
    {
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidIssuer = "http://localhost:7005",
                    ValidateAudience = false,
                    ValidAudiences = new[] { "client" },
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Convert.FromBase64String("DRjd/GnduI3Efzen9V9BvbNUfc/VKgXltV7Kbk9sMkY=")
                    ),
                    ValidateIssuerSigningKey = true,
                };
            });

        return services;
    }
}
