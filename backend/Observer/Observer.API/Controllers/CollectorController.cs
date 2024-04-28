using Common.Serilog;
using Microsoft.AspNetCore.Mvc;
using Observer.BLL.Dtos;
using Observer.BLL.Services;

namespace Observer.API.Controllers;

/// <summary>
/// Controller to collect data
/// </summary>
public class CollectorController : ControllerBase
{
    private readonly HttpRequestService _httpRequestService;
    private readonly LogsService _logsService;

    public CollectorController(HttpRequestService httpRequestService, LogsService logsService)
    {
        _httpRequestService = httpRequestService;
        _logsService = logsService;
    }

    /// <summary>
    /// Collect HTTP request
    /// </summary>
    [HttpPost("http")]
    public async Task CollectHttpRequestAsync([FromBody] HttpRequestCreateDto dto)
    {
        await _httpRequestService.CreateAsync(dto);
    }

    /// <summary>
    /// Collect HTTP request
    /// </summary>
    [HttpPost("logs")]
    public async Task CollectLogsRequestAsync([FromBody] LogEventEntity dto)
    {
        await _logsService.CreateAsync(dto);
    }
}
