using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

[Controller]
[Route("account/internal")]
public class AccountInternalController : ControllerBase
{
    private readonly AccountInternalService _accountInternalService;

    public AccountInternalController(AccountInternalService accountInternalService)
    {
        _accountInternalService = accountInternalService;
    }

    /// <summary>
    /// Loan charge
    /// </summary>
    [HttpPost("{id:guid}/loan-charge")]
    public async Task LoanCharge(Guid accountId, LoanChargeDto dto)
    {
        await _accountInternalService.LoanCharge(accountId, dto);
    }

    /// <summary>
    /// Cancel loan charge
    /// </summary>
    [HttpDelete("loan-charge")]
    public async Task LoanChargeCancel(Guid accountId, LoanChargeDto dto)
    {
        await _accountInternalService.LoanChargeCancel(accountId, dto);
    }

    /// <summary>
    /// Loan income
    /// </summary>
    [HttpPost("loan-income")]
    public async Task LoanIncome(Guid accountId, LoanIncomeDto dto)
    {
        await _accountInternalService.LoanIncome(accountId, dto);
    }
}
