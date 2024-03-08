using Common.Auth.ApiKeyAuthorization;
using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

/// <summary>
/// Account controller for employee
/// </summary>
[Controller]
[ApiKeyAuthorization]
[Route("account/employee")]
public class AccountEmployeeController : ControllerBase
{
    private readonly AccountExternalService _accountExternalService;

    /// <inheritdoc/>
    public AccountEmployeeController(AccountExternalService accountExternalService)
    {
        _accountExternalService = accountExternalService;
    }

    /// <summary>
    /// Get all accounts
    /// </summary>
    [HttpGet]
    public async Task<List<AccountDto>> GetAccounts(SearchAccountEmployeeDto searchDto)
    {
        return await _accountExternalService.GetAccounts(searchDto);
    }

    /// <summary>
    /// Get specific account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id)
    {
        return await _accountExternalService.GetAccount(id);
    }
}
