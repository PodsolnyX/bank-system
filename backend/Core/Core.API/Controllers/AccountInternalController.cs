using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

/// <inheritdoc/>
[Controller]
[AllowAnonymous]
[Route("account/internal")]
public class AccountInternalController : ControllerBase
{
    private readonly AccountInternalService _accountInternalService;
    private readonly AccountExternalService _accountExternalService;

    /// <inheritdoc/>
    public AccountInternalController(
        AccountInternalService accountInternalService,
        AccountExternalService accountExternalService
    )
    {
        _accountInternalService = accountInternalService;
        _accountExternalService = accountExternalService;
    }

    /// <summary>
    /// Get specific account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id)
    {
        return await _accountExternalService.GetAccount(id);
    }

    /// <summary>
    /// Modifies account
    /// </summary>
    [HttpPost("{accountId:guid}/modification")]
    public async Task Modify(Guid accountId, AccountModificationDto dto)
    {
        await _accountInternalService.ModifyAccount(accountId, dto);
    }

    /// <summary>
    /// Cancel account modification
    /// </summary>
    [HttpDelete("{accountId:guid}/modification")]
    public async Task ModifyCancel(Guid accountId, AccountModificationDto dto)
    {
        await _accountInternalService.ModifyAccountCancel(accountId, dto);
    }
}
