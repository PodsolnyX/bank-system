using Common.Auth.ApiKeyAuthorization;
using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

/// <summary>
/// Account controller for user
/// </summary>
[Controller]
[Route("account/user")]
public class AccountUserController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountUserController(AccountService accountService)
    {
        _accountService = accountService;
    }

    /// <summary>
    /// Open account
    /// </summary>
    [HttpPost]
    public async Task<AccountDto> OpenAccount(OpenAccountDto dto)
    {
        var userId = HttpContext.GetUserId();
        return await _accountService.OpenAccount(userId, dto);
    }

    /// <summary>
    /// Close account
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task CloseAccount(Guid id)
    {
        var userId = HttpContext.GetUserId();
        await _accountService.CloseAccount(userId, id);
    }

    /// <summary>
    /// Get user`s accounts
    /// </summary>
    [HttpGet]
    public async Task<List<AccountDto>> GetAccounts(SearchAccountUserDto searchDto)
    {
        var userId = HttpContext.GetUserId();
        return await _accountService.GetAccounts(userId, searchDto);
    }

    /// <summary>
    /// Get user`s account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id)
    {
        var userId = HttpContext.GetUserId();
        return await _accountService.GetAccount(userId, id);
    }

    /// <summary>
    /// Deposit money to account
    /// </summary>
    [HttpPost("{accountId:guid}/deposit")]
    public async Task Deposit(Guid accountId, DepositDto dto)
    {
        var userId = HttpContext.GetUserId();
        await _accountService.Deposit(userId, accountId, dto);
    }

    /// <summary>
    /// Withdraw money from account
    /// </summary>
    [HttpPost("{accountId:guid}/withdraw")]
    public async Task Withdraw(Guid accountId, DepositDto dto)
    {
        var userId = HttpContext.GetUserId();
        await _accountService.Withdraw(userId, accountId, dto);
    }
}
