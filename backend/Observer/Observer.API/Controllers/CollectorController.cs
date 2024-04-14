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

    public CollectorController(HttpRequestService httpRequestService)
    {
        _httpRequestService = httpRequestService;
    }

    /// <summary>
    /// Collect HTTP request
    /// </summary>
    [HttpPost("http")]
    public async Task CollectHttpRequestAsync([FromBody] HttpRequestCreateDto dto)
    {
        await _httpRequestService.CreateAsync(dto);
    }
}
