using System.Collections.Immutable;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

namespace Common.Idempotency;

public class IdempotencyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<IdempotencyMiddleware> _logger;
    private readonly IDistributedCache _cache;

    public IdempotencyMiddleware(
        RequestDelegate next,
        ILogger<IdempotencyMiddleware> logger,
        IDistributedCache cache
    )
    {
        _next = next;
        _logger = logger;
        _cache = cache;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var cacheKey = BuildKey(context);
        var cachedBody = cacheKey != null ? await GetFromCache(cacheKey) : null;

        if (cacheKey == null)
        {
            _logger.LogWarning(
                "Idempotency key not found in request headers. Proceeding without caching."
            );
            await _next(context);
        }
        else if (cachedBody != null)
        {
            _logger.LogInformation("Idempotency key {@IdempotencyKey} found in cache", cacheKey);
            await WriteResponseFromCache(context, cachedBody);
        }
        else
        {
            _logger.LogInformation(
                "Idempotency key {@IdempotencyKey} was not found in cache",
                cacheKey
            );
            HttpResponse response = context.Response;
            var originalResponseBody = response.Body;
            using var newResponseBody = new MemoryStream();
            response.Body = newResponseBody;

            await _next(context);

            if (response.StatusCode is >= 200 and < 300)
            {
                newResponseBody.Seek(0, SeekOrigin.Begin);
                await newResponseBody.CopyToAsync(originalResponseBody);
                newResponseBody.Seek(0, SeekOrigin.Begin);
                context.Response.Body = originalResponseBody;

                var body = await new StreamReader(newResponseBody).ReadToEndAsync();
                await WriteBodyToCache(cacheKey, body);
            }
            else
            {
                _logger.LogWarning(
                    "Response status code {@StatusCode} is not cacheable. Skipping caching.",
                    response.StatusCode
                );
            }
        }
    }

    private string? BuildKey(HttpContext context)
    {
        try
        {
            var identifier = context
                .Request.Headers.ToImmutableArray()
                .Where(h => h.Key == "X-Idempotency-Key")
                .Select(s => s.Value.FirstOrDefault())
                .FirstOrDefault();
            var path = context.Request.Path.Value;

            if (identifier == null || path == null)
            {
                return null;
            }

            var method = context.Request.Method;
            return string.Join(
                "_",
                [method.ToLowerInvariant(), path.Replace("/", "-"), identifier]
            );
        }
        catch
        {
            return null;
        }
    }

    private async Task<string?> GetFromCache(string key)
    {
        string? exists = null;
        try
        {
            exists = await _cache.GetStringAsync(key);
        }
        catch (Exception e)
        {
            _logger.LogError(
                "Error while reading {@IdempotencyKey} from cache: {@Exception}",
                key,
                e
            );
        }

        return exists;
    }

    private async Task WriteResponseFromCache(HttpContext context, string cachedBody)
    {
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(cachedBody);
    }

    private async Task WriteBodyToCache(string key, string body)
    {
        try
        {
            _logger.LogInformation("Writing idempotency key {@IdempotencyKey} to cache", key);
            await _cache.SetStringAsync(
                key,
                body,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(7),
                }
            );
            _logger.LogInformation("Idempotency key {@IdempotencyKey} written to cache", key);
        }
        catch (Exception e)
        {
            _logger.LogError(
                "Error while writing {@IdempotencyKey} to cache: {@Exception}",
                key,
                e
            );
        }
    }
}

public static class IdempotencyMiddlewareExtension
{
    /// <summary>
    /// Extension method
    /// </summary>
    /// <param name="builder"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseIdempotencyMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<IdempotencyMiddleware>();
    }
}
