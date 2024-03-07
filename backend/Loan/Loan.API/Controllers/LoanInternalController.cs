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
    public async Task TakeLoan(TakeLoanDto dto) {
        await _internalService.TakeLoan(dto);
    }
    
    [HttpDelete("{loanId:guid}/take-cancel")]
    public async Task TakeLoanCancel(Guid loanId) {
        await _internalService.TakeLoanCancel(loanId);
    }
    
    [HttpDelete("{loanId:guid}/charge")]
    public async Task ChargeLoanCancel(LoanChargeDto dto) {
        await _internalService.ChargeLoanCancel(dto);
    }
}