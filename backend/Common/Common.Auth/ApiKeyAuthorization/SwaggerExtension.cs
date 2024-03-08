using Microsoft.AspNetCore.Authorization;
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
                Description = "ApiKey is user UUID",
                Type = SecuritySchemeType.ApiKey,
                Name = Constants.ApiKeyName,
                In = ParameterLocation.Header,
                Scheme = "ApiKeyScheme"
            }
        );
        options.OperationFilter<AuthorizationOperationFilter>();
    }

    private class AuthorizationOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var actionMetadata = context.ApiDescription.ActionDescriptor.EndpointMetadata;
            var isAuthorized = actionMetadata.Any(metadataItem =>
                metadataItem is ApiKeyAuthorizationAttribute
            );
            var allowAnonymous = actionMetadata.Any(metadataItem =>
                metadataItem is AllowAnonymousAttribute
            );
            if (!isAuthorized || allowAnonymous)
            {
                return;
            }

            operation.Parameters ??= new List<OpenApiParameter>();
            operation.Security = new List<OpenApiSecurityRequirement>
            {
                new()
                {
                    {
                        new OpenApiSecurityScheme()
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "ApiKey"
                            },
                            In = ParameterLocation.Header
                        },
                        Array.Empty<string>()
                    }
                }
            };
        }
    }
}
