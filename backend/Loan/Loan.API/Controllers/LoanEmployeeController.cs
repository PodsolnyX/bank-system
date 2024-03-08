using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/employee")]
public class LoanEmployeeController: ControllerBase {
    private readonly LoanService _loanService;

    public LoanEmployeeController(LoanService loanService) {
        _loanService = loanService;
    }

    /*/// <summary>
    /// Get specific loan
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }*/
    
    /// <summary>
    /// Get all loans
    /// </summary>
    [HttpGet]
    public async Task<List<LoanDto>> GetLoans(SearchLoanEmployeeDto dto) {
        return await _loanService.GetLoans(dto);
    }
}