using Loan.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("tariff/employee")]
public class TariffEmployeeController: ControllerBase {
    
    /// <summary>
    /// Create tariff
    /// </summary>
    [HttpPost]
    public Task<List<LoanDto>> CreateTariff(TariffCreateDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Delete tariff
    /// </summary>
    [HttpDelete("{id:guid}")]
    public Task<List<LoanDto>> DeleteTariff(Guid id) {
        throw new NotImplementedException();
    }
    
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