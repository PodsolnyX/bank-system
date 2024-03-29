using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

/// <inheritdoc/>
[Controller]
[AllowAnonymous]
[Route("account/internal")]
public class AccountInternalController : ControllerBase {
    private readonly AccountInternalService _accountInternalService;
    private readonly AccountExternalService _accountExternalService;

    /// <inheritdoc/>
    public AccountInternalController(
        AccountInternalService accountInternalService,
        AccountExternalService accountExternalService
    ) {
        _accountInternalService = accountInternalService;
        _accountExternalService = accountExternalService;
    }

    /// <summary>
    /// Get specific account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id) {
        return await _accountExternalService.GetAccount(id);
    }

    /// <summary>
    /// Modifies account
    /// </summary>
    [HttpPost("{accountId:guid}/modification")]
    public async Task Modify(Guid accountId, [FromBody] AccountModificationDto dto) {
        await _accountInternalService.ModifyAccount(accountId, dto);
    }

    /// <summary>
    /// Cancel account modification
    /// </summary>
    [HttpDelete("{accountId:guid}/modification")]
    public async Task ModifyCancel(Guid accountId, [FromBody] AccountModificationDto dto) {
        await _accountInternalService.ModifyAccountCancel(accountId, dto);
    }

    /// <summary>
    /// Transfer money from my account to master-account (charge loan)
    /// </summary>
    [HttpPost("{accountId:guid}/transfer/to-master")]
    public async Task TransferMoneyToMasterAccount(Guid accountId, int amount) {
        await _accountInternalService.TransferMoneyInternal(
            accountId,
            new Guid("F6AB14AA-4634-4644-A6A9-2F84D8A878DB"), amount);
    }

    /// <summary>
    /// Transfer money from master-account to my account (request loan)
    /// </summary>
    [HttpPost("{accountId:guid}/transfer/from-master")]
    public async Task TransferMoneyFromMasterAccount(Guid accountId, int amount) {
        await _accountInternalService.TransferMoneyInternal(
            new Guid("F6AB14AA-4634-4644-A6A9-2F84D8A878DB"),
            accountId, amount);
    }
    
}
