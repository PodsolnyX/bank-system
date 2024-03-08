using Arbiter.BLL.DataTransferObjects;
using Arbiter.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Arbiter.API.Controllers;

[Controller]
[Route("arbiter/internal")]
public class ArbiterInternalController: ControllerBase {
    private readonly RequestLoanService _requestLoanService;
    private readonly RequestLoanChargeService _loanChargeService;

    public ArbiterInternalController(RequestLoanService requestLoanService, RequestLoanChargeService loanChargeService) {
        _requestLoanService = requestLoanService;
        _loanChargeService = loanChargeService;
    }

    /// <summary>
    /// Request Loan
    /// </summary>
    [HttpPost("loan")]
    public async Task RequestLoan([FromBody] RequestLoanDto dto) {
        await _requestLoanService.RequestLoan(dto);
    }
    
    /// <summary>
    /// Request Loan Charge 
    /// </summary>
    [HttpPost("loan-charge")]
    public async Task RequestLoanCharge([FromBody] RequestLoanChargeDto dto) {
        await _loanChargeService.RequestLoanCharge(dto);
    }
}