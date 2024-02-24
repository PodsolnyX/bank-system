using Loan.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/internal")]
public class LoanInternalController: ControllerBase {
    
    [HttpPost("take")]
    public Task<LoanDto> TakeLoan(TakeLoanDto dto) {
        throw new NotImplementedException();
    }
    
    [HttpPost("charge")]
    public Task<LoanDto> ChargeLoan(LoanChargeDto dto) {
        throw new NotImplementedException();
    }
    
    [HttpDelete("take/{loanId:guid}")]
    public Task<LoanDto> TakeLoanCancel(Guid loanId) {
        throw new NotImplementedException();
    }
    
    [HttpDelete("charge")]
    public Task<LoanDto> ChargeLoanCancel(LoanChargeDto dto) {
        throw new NotImplementedException();
    }
}