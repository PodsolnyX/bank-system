using System.Security.Claims;
using Common.Auth.ApiKeyAuthorization;
using Common.Enum;
using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

/// <summary>
/// Account controller for user
/// </summary>
[Controller]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Route("account/user")]
public class AccountUserController : ControllerBase
{
    private readonly AccountExternalService _accountExternalService;

    /// <inheritdoc/>
    public AccountUserController(AccountExternalService accountExternalService)
    {
        _accountExternalService = accountExternalService;
    }

    /// <summary>
    /// Open account
    /// </summary>
    [HttpPost]
    public async Task<AccountDto> OpenAccount(OpenAccountDto dto)
    {
        var userId = HttpContext.GetUserId();
        return await _accountExternalService.OpenAccount(userId, dto);
    }

    /// <summary>
    /// Close account
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task CloseAccount(Guid id)
    {
        var userId = HttpContext.GetUserId();
        await _accountExternalService.CloseAccount(userId, id);
    }

    /// <summary>
    /// Get user`s accounts
    /// </summary>
    [HttpGet]
    public async Task<List<AccountDto>> GetAccounts(SearchAccountUserDto searchDto)
    {
        var userId = HttpContext
            .User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault();
        return await _accountExternalService.GetAccounts(userId, searchDto);
    }

    /// <summary>
    /// Get user`s account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id)
    {
        var userId = HttpContext
            .User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault();
        return await _accountExternalService.GetAccount(userId, id);
    }

    /// <summary>
    /// Deposit money to account
    /// </summary>
    [HttpPost("{accountId:guid}/deposit")]
    public async Task Deposit(Guid accountId, DepositDto dto)
    {
        var userId = HttpContext
            .User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault();

        var modificationDto = new AccountModificationDto
        {
            Type = OperationType.Deposit,
            Reason = OperationReason.Cash,
            Amount = dto.Amount,
            Message = dto.Message
        };
        await _accountExternalService.ModifyAccount(userId, accountId, modificationDto);
    }

    /// <summary>
    /// Withdraw money from account
    /// </summary>
    [HttpPost("{accountId:guid}/withdraw")]
    public async Task Withdraw(Guid accountId, WithdrawDto dto)
    {
        var userId = HttpContext
            .User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault();

        var modificationDto = new AccountModificationDto
        {
            Type = OperationType.Withdraw,
            Reason = OperationReason.Cash,
            Amount = dto.Amount,
            Message = dto.Message
        };
        await _accountExternalService.ModifyAccount(userId, accountId, modificationDto);
    }

    /// <summary>
    /// Transfer from account to account
    /// </summary>
    [HttpPost("{fromAccountId:guid}/transfer/{toAccountId:guid}")]
    public async Task TransferMoney(Guid fromAccountId, Guid toAccountId, int amount)
    {
        var userId = HttpContext
            .User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault();
        await _accountExternalService.TransferMoney(fromAccountId, toAccountId, amount, userId);
    }
}
