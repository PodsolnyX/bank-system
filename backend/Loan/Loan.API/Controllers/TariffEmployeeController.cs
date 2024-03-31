using Common.Auth.ApiKeyAuthorization;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

/// <summary>
/// Controller for employee
/// </summary>
[Controller]
[Route("tariff/employee")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Employee")]

public class TariffEmployeeController: ControllerBase {
    private readonly TariffService _tariffService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="tariffService"></param>
    public TariffEmployeeController(TariffService tariffService) {
        _tariffService = tariffService;
    }

    /// <summary>
    /// Create tariff
    /// </summary>
    [HttpPost]
    public async Task CreateTariff([FromBody] TariffCreateDto dto) {
         await _tariffService.CreateTariff(dto);
    }
    
    /// <summary>
    /// Delete tariff
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task DeleteTariff(Guid id) {
        await _tariffService.DeleteTariff(id);
    }
    
    /*/// <summary>
    /// Get tariff
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<List<LoanDto>> GetTariff(Guid id) {
        throw new NotImplementedException();
    }*/
    
    /// <summary>
    /// Get tariffs
    /// </summary>
    [HttpGet]
    public async Task<List<TariffDto>> GetTariffs(SearchTariffDto dto) {
       return await _tariffService.GetTariffs(dto);
    }
}