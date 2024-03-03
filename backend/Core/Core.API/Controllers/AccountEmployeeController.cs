using Core.BLL.DataTransferObjects;
using Core.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

/// <summary>
/// Account controller for employee
/// </summary>
[Controller]
[Route("account/employee")]
public class AccountEmployeeController : ControllerBase
{
    private readonly AccountService _accountService;

    public AccountEmployeeController(AccountService accountService)
    {
        _accountService = accountService;
    }

    /// <summary>
    /// Get all accounts
    /// </summary>
    [HttpGet]
    public async Task<List<AccountDto>> GetAccounts(SearchAccountEmployeeDto searchDto)
    {
        return await _accountService.GetAccounts(searchDto);
    }

    /// <summary>
    /// Get specific account
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<AccountDto> GetAccount(Guid id)
    {
        return await _accountService.GetAccount(id);
    }
}
