using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Common.Exception;

public class DoomMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    /// <summary>
    /// Constructor
    /// </summary>
    public DoomMiddleware(RequestDelegate next, ILogger<DoomMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    /// <summary>
    /// Handle exception
    /// </summary>
    /// <param name="context"></param>
    public async Task InvokeAsync(HttpContext context)
    {
        var fiftyPercent = new Random().Next(0, 2) == 1;
        var ninetyPercent = new Random().Next(0, 10) < 9;

        if (DateTime.UtcNow.Minute % 2 == 0 && ninetyPercent)
        {
            throw new ApplicationException("Doom 90%");
        }
        if (DateTime.UtcNow.Minute % 2 == 1 && fiftyPercent)
        {
            throw new ApplicationException("Doom 50%");
        }
        await _next(context);
    }
}

/// <summary>
/// Exception handler middleware extension
/// </summary>
public static class DoomMiddlewareExtension
{
    /// <summary>
    /// Extension method
    /// </summary>
    /// <param name="builder"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseDoomMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<DoomMiddleware>();
    }
}
