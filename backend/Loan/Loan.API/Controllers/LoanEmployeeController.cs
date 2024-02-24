using Loan.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/employee")]
public class LoanEmployeeController: ControllerBase {
    
    /// <summary>
    /// Get specific loan
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get all loans
    /// </summary>
    [HttpGet]
    public Task<List<LoanDto>> GetLoans(SearchLoanEmployeeDto dto) {
        throw new NotImplementedException();
    }
}