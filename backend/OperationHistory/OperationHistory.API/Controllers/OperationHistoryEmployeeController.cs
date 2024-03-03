﻿using Microsoft.AspNetCore.Mvc;
using OperationHistory.BLL.DataTransferObjects;
using OperationHistory.BLL.Services;

namespace OperationHistory.API.Controllers;

[Controller]
[Route("operation-history/employee")]
public class OperationHistoryEmployeeController: ControllerBase {
    
    private readonly OperationHistoryService _operationHistoryService;
    
    /// <summary>
    /// Get operation history of users
    /// </summary>
    [HttpGet]
    public async Task<List<OperationDto>> GetOperations(SearchOperationEmployeeDto dto)
    {
        return await _operationHistoryService.GetOperations(dto);
    }
}