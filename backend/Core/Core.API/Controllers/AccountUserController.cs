using System.Security.Claims;
using Common.Auth.Jwt;
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
        var userId = HttpContext.GetUserId();
        return await _accountExternalService.GetAccounts(userId, searchDto);
    }

    /// <summary>
    /// Get user`s account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id)
    {
        var userId = HttpContext.GetUserId();
        return await _accountExternalService.GetAccount(userId, id);
    }

    /// <summary>
    /// Deposit money to account
    /// </summary>
    [HttpPost("{accountId:guid}/deposit")]
    public async Task Deposit(Guid accountId, DepositDto dto)
    {
        var userId = HttpContext.GetUserId();

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
        var userId = HttpContext.GetUserId();

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
    /// Transfer money from my account to my account
    /// </summary>
    [HttpPost("{fromAccountId:guid}/transfer/{toAccountId:guid}")]
    public async Task TransferMoneyBetweenAccounts(
        Guid fromAccountId,
        Guid toAccountId,
        long amount
    )
    {
        var userId = HttpContext.GetUserId();
        await _accountExternalService.TransferMoneyBetweenMyAccounts(
            fromAccountId,
            toAccountId,
            amount,
            userId
        );
    }

    /// <summary>
    /// Transfer money from my account to user
    /// </summary>
    [HttpPost("{fromAccountId:guid}/transfer/{toUserId:guid}/toUser")]
    public async Task TransferMoneyToUser(Guid fromAccountId, Guid toUserId, long amount)
    {
        var userId = HttpContext.GetUserId();
        await _accountExternalService.TransferMoneyToUser(fromAccountId, toUserId, amount, userId);
    }

    /// <summary>
    /// Make account priority
    /// </summary>
    [HttpPost("{accountId:guid}/priority")]
    public async Task MakePriority(Guid accountId)
    {
        var userId = HttpContext.GetUserId();
        await _accountExternalService.MakeAccountPriority(accountId, userId);
    }
}
