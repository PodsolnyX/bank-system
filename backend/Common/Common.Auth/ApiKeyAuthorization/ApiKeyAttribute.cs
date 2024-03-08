using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using IAuthorizationFilter = Microsoft.AspNetCore.Mvc.Filters.IAuthorizationFilter;

namespace Common.Auth.ApiKeyAuthorization;

public class ApiKeyAuthorizationAttribute : TypeFilterAttribute
{
    public ApiKeyAuthorizationAttribute()
        : base(typeof(ApiKeyAuthorizationFilter)) { }
}

public class ApiKeyAuthorizationFilter : IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var httpContext = context.HttpContext;
        if (!httpContext.Request.Headers.TryGetValue(Constants.ApiKeyName, out var extractedApiKey))
        {
            httpContext.Response.StatusCode = 401;
            context.Result = new UnauthorizedResult();
            return;
        }

        httpContext.User = new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, extractedApiKey) }, "ApiKey")
        );
    }
}
