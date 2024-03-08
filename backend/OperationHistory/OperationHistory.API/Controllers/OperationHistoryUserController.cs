using Common.Auth.ApiKeyAuthorization;
using Microsoft.AspNetCore.Mvc;
using OperationHistory.BLL.DataTransferObjects;
using OperationHistory.BLL.Services;

namespace OperationHistory.API.Controllers;

/// <summary>
/// Operation history controller for user
/// </summary>
[Controller]
[Route("operation-history/user")]
public class OperationHistoryUserController : ControllerBase
{
    private readonly OperationHistoryReaderService _operationHistoryReaderService;

    /// <inheritdoc/>
    public OperationHistoryUserController(OperationHistoryReaderService operationHistoryReaderService)
    {
        _operationHistoryReaderService = operationHistoryReaderService;
    }

    /// <summary>
    /// Get operation history
    /// </summary>
    [HttpGet]
    public async Task<List<OperationDto>> GetOperations(SearchOperationUserDto dto)
    {
        var userId = HttpContext.GetUserId();
        return await _operationHistoryReaderService.GetOperations(userId, dto);
    }
}
