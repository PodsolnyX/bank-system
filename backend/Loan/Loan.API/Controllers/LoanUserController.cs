using Loan.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/user")]
public class LoanUserController: ControllerBase {
    
    /// <summary>
    /// Request a loan
    /// </summary>
    [HttpPost("request")]
    public Task<LoanDto> RequestLoan(RequestLoanDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Charge a loan
    /// </summary>
    [HttpPost("charge")]
    public Task<LoanDto> ChargeLoan(LoanChargeDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get user`s loan
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get user`s loans
    /// </summary>
    [HttpGet]
    public Task<List<LoanDto>> GetLoans(SearchLoanUserDto dto) {
        throw new NotImplementedException();
    }
}