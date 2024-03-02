using Microsoft.AspNetCore.Mvc;
using OperationHistory.BLL.DataTransferObjects;

namespace OperationHistory.API.Controllers;

[ApiController]
[Route("operation-history/employee")]
public class OperationHistoryEmployeeController: ControllerBase {
    
    /// <summary>
    /// Get operation history of users
    /// </summary>
    [HttpGet]
    public Task<List<OperationDto>> GetOperations(SearchOperationEmployeeDto dto) {
        throw new NotImplementedException();
    }
}