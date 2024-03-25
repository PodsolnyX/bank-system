using System.Security.Claims;
using Common.Exception;
using Microsoft.AspNetCore.Http;

namespace Common.Auth.Jwt;

public static class Helpers
{
    public static Guid GetUserId(this HttpContext context)
    {
        return context
            .User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault();
    }
}
