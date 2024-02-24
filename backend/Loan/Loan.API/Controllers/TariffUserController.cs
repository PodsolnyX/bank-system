using Loan.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("tariff/user")]
public class TariffUserController: ControllerBase {
    
    /// <summary>
    /// Get tariff
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<List<LoanDto>> GetTariff(Guid id) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get tariffs
    /// </summary>
    [HttpGet]
    public Task<List<LoanDto>> GetTariffs(SearchTariffDto dto) {
        throw new NotImplementedException();
    }
}