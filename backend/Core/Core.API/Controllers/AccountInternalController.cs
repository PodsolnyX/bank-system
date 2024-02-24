using Core.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

[Controller]
[Route("account/internal")]
public class AccountInternalController: ControllerBase {
    [HttpPost("loan-charge")]
    public Task LoanCharge(LoanChargeDto dto) {
        throw new NotImplementedException();
    }
    
    [HttpDelete("loan-charge")]
    public Task LoanChargeCancel(LoanChargeDto dto) {
        throw new NotImplementedException();
    }
    
    [HttpPost("loan-income")]
    public Task LoanIncome(LoanIncomeDto dto) {
        throw new NotImplementedException();
    }
    
    [HttpDelete("loan-income")]
    public Task LoanIncomeCancel(LoanIncomeDto dto) {
        throw new NotImplementedException();
    }
}