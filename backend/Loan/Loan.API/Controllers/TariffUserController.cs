using Common.Auth.ApiKeyAuthorization;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

/// <summary>
/// Controller for user
/// </summary>
[Controller]
[Route("tariff/user")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class TariffUserController: ControllerBase {
    private readonly TariffService _tariffService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="tariffService"></param>
    public TariffUserController(TariffService tariffService) {
        _tariffService = tariffService;
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
        return await _tariffService.GetTariffsUser(dto);
    }
}