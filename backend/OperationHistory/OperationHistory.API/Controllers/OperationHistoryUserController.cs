using Common.Auth.ApiKeyAuthorization;
using Microsoft.AspNetCore.Mvc;
using OperationHistory.BLL.DataTransferObjects;
using OperationHistory.BLL.Services;

namespace OperationHistory.API.Controllers;

[Controller]
[Route("operation-history/user")]
public class OperationHistoryUserController : ControllerBase
{
    private readonly OperationHistoryService _operationHistoryService;

    public OperationHistoryUserController(OperationHistoryService operationHistoryService)
    {
        _operationHistoryService = operationHistoryService;
    }

    /// <summary>
    /// Get operation history
    /// </summary>
    [HttpGet]
    public async Task<List<OperationDto>> GetOperations(SearchOperationUserDto dto)
    {
        var userId = HttpContext.GetUserId();
        return await _operationHistoryService.GetOperations(userId, dto);
    }
}
