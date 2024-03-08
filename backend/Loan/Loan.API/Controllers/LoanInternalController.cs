using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/internal")]
public class LoanInternalController: ControllerBase {
    private readonly LoanInternalService _internalService;

    public LoanInternalController(LoanInternalService internalService) {
        _internalService = internalService;
    }

    [HttpPost("take")]
    public async Task<Guid> TakeLoan([FromBody]TakeLoanDto dto) {
       return await _internalService.TakeLoan(dto);
    }
    
    [HttpDelete("{loanId:guid}/take-cancel")]
    public async Task TakeLoanCancel(Guid loanId) {
        await _internalService.TakeLoanCancel(loanId);
    }
    
    [HttpPost("{loanId:guid}/charge")]
    public async Task ChargeLoanCancel(Guid loanId,[FromBody] LoanChargeDto dto) {
        await _internalService.ChargeLoan(dto, loanId);
    }
}