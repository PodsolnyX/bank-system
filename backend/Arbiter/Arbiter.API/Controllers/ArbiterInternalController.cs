using Arbiter.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Arbiter.API.Controllers;

[Controller]
[Route("arbiter/internal")]
public class ArbiterInternalController: ControllerBase {
    
    /// <summary>
    /// Request Loan
    /// </summary>
    [HttpPost("loan")]
    public async Task RequestLoan([FromBody] RequestLoanDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Request Loan Charge 
    /// </summary>
    [HttpPost("loan-charge")]
    public async Task RequestLoanCharge([FromBody] RequestLoanChargeDto dto) {
        throw new NotImplementedException();
    }
}