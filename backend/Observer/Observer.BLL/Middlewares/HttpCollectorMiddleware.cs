using System.Diagnostics;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
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

        HttpResponse response = context.Response;
        var originalResponseBody = response.Body;
        using var newResponseBody = new MemoryStream();
        response.Body = newResponseBody;

        try
        {
            await next(context);

            newResponseBody.Seek(0, SeekOrigin.Begin);
            await newResponseBody.CopyToAsync(originalResponseBody);
            newResponseBody.Seek(0, SeekOrigin.Begin);
            context.Response.Body = originalResponseBody;
        }
        finally
        {
            var endTime = DateTime.UtcNow;
            timer.Stop();

            var httpRequest = new HttpRequestCreateDto()
            {
                MicroserviceName = options.Value.MicroserviceName,
                Tags = options.Value.Tags,
                Source = "HTTP",

                StartedAt = startTime,
                FinishedAt = endTime,
                DurationInMilliseconds = timer.ElapsedMilliseconds,

                Method = context.Request.Method,
                Path = context.Request.Path,
                QueryString = context.Request.QueryString.ToString(),
                Body = await new StreamReader(context.Request.Body).ReadToEndAsync(),
                Headers = context.Request.Headers.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.ToString()
                ),

                RemoteIpAddress = context.Connection.RemoteIpAddress?.ToString(),
                UserAgent = context.Request.Headers["User-Agent"].ToString(),

                StatusCode = context.Response.StatusCode,
                ResponseBody = await new StreamReader(newResponseBody).ReadToEndAsync(),
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
