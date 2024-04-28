using Observer.BLL.Dtos;
using Observer.DAL;
using Observer.DAL.Entities;

namespace Observer.BLL.Services;

public class HttpRequestService(ObserverDbContext context)
{
    public async Task CreateAsync(HttpRequestCreateDto dto)
    {
        var httpRequest = new HttpRequest
        {
            CreatedAt = DateTime.UtcNow,

            MicroserviceName = dto.MicroserviceName,
            Tags = dto.Tags,
            Source = dto.Source,

            StartedAt = dto.StartedAt,
            FinishedAt = dto.FinishedAt,
            DurationInMilliseconds = dto.DurationInMilliseconds,

            Method = dto.Method,
            Path = dto.Path,
            QueryString = dto.QueryString,
            Body = dto.Body,
            Headers = dto.Headers,

            RemoteIpAddress = dto.RemoteIpAddress,
            UserAgent = dto.UserAgent,

            StatusCode = dto.StatusCode,
            ResponseBody = dto.ResponseBody,
            ResponseHeaders = dto.ResponseHeaders
        };

        await context.HttpRequests.AddAsync(httpRequest);
        await context.SaveChangesAsync();
    }
}
