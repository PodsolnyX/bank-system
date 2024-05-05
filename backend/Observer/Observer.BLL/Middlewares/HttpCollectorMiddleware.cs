using System.Collections.Immutable;
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Observer.BLL.Configuration;
using Observer.BLL.Dtos;

namespace Observer.BLL.Middlewares;

public class HttpCollectorMiddleware(RequestDelegate next, IOptions<ObserverOptions> options)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var startTime = DateTime.UtcNow;
        var timer = Stopwatch.StartNew();
        try
        {
            await next(context);
        }
        finally
        {
            var endTime = DateTime.UtcNow;
            timer.Stop();

            IHostEnvironment? env =
                Host.CreateDefaultBuilder().Build().Services.GetService(typeof(IHostEnvironment))
                as IHostEnvironment;

            var httpRequest = new HttpRequestCreateDto()
            {
                MicroserviceName = env?.ApplicationName ?? "Unknown",
                Tags = options.Value.Tags,
                Source = "HTTP",
                TraceId = context.TraceIdentifier,
                IdempotencyKey = context
                    .Request.Headers.ToImmutableArray()
                    .Where(h => h.Key == "X-Idempotency-Key")
                    .Select(s => s.Value.FirstOrDefault())
                    .FirstOrDefault(),

                StartedAt = startTime,
                FinishedAt = endTime,
                DurationInMilliseconds = timer.ElapsedMilliseconds,

                Method = context.Request.Method,
                Path = context.Request.Path,
                QueryString = context.Request.QueryString.ToString(),
                Headers = context.Request.Headers.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.ToString()
                ),

                RemoteIpAddress = context.Connection.RemoteIpAddress?.ToString(),
                UserAgent = context
                    .Request.Headers.ToImmutableArray()
                    .Where(h => h.Key == "User-Agent")
                    .Select(s => s.Value.FirstOrDefault())
                    .FirstOrDefault(),

                StatusCode = context.Response.StatusCode,
                ResponseHeaders = context.Response.Headers.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.ToString()
                )
            };

            using var httpClient = new HttpClient();
            var content = new StringContent(
                JsonSerializer.Serialize(httpRequest),
                Encoding.UTF8,
                "application/json"
            );
            try
            {
                await httpClient.PostAsync(options.Value.CollectorUrl, content);
            }
            catch (Exception e)
            {
                Console.WriteLine($"HTTP unreachable: {options.Value.CollectorUrl}");
                Console.WriteLine(e.Message);
                // ignore
            }
        }
    }
}

public static class HttpCollectorMiddlewareExtensions
{
    public static IApplicationBuilder UseHttpCollectorMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<HttpCollectorMiddleware>();
    }
}
