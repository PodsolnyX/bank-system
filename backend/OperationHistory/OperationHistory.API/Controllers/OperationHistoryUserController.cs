using Microsoft.AspNetCore.Mvc;
using OperationHistory.BLL.DataTransferObjects;

namespace OperationHistory.API.Controllers;
[ApiController]
[Route("operation-history/user")]
public class OperationHistoryUserController: ControllerBase {
    
    /// <summary>
    /// Get operation history
    /// </summary>
    [HttpGet]
    public Task<List<OperationDto>> GetOperations(SearchOperationUserDto dto) {
        throw new NotImplementedException();
    }
}