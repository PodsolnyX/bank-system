using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Common.Auth.ApiKeyAuthorization;

public static class SwaggerExtension
{
    public static void UseApiKeyAuthorization(this SwaggerGenOptions options)
    {
        options.AddSecurityDefinition(
            "ApiKey",
            new OpenApiSecurityScheme
            {
                Description = "ApiKey must appear in header",
                Type = SecuritySchemeType.ApiKey,
                Name = Constants.ApiKeyName,
                In = ParameterLocation.Header,
                Scheme = "ApiKeyScheme"
            }
        );
        var key = new OpenApiSecurityScheme()
        {
            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "ApiKey" },
            In = ParameterLocation.Header
        };
        var requirement = new OpenApiSecurityRequirement { { key, new List<string>() } };
        options.AddSecurityRequirement(requirement);
    }
}
