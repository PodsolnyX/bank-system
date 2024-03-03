using Common.Exception;
using Microsoft.AspNetCore.Http;

namespace Common.Auth.ApiKeyAuthorization;

public static class Helpers
{
    public static Guid GetUserId(this HttpContext context)
    {
        var raw = context.User.Identity?.Name;
        if (string.IsNullOrEmpty(raw) || !Guid.TryParse(raw, out var userId))
        {
            throw new UnauthorizedException();
        }

        return userId;
    }
}
