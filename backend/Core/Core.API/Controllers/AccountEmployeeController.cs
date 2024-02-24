using Core.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

[Controller]
[Route("account/employee")]
public class AccountEmployeeController: ControllerBase {
    
    /// <summary>
    /// Get all accounts
    /// </summary>
    [HttpGet]
    public Task<AccountDto> GetAccounts(SearchAccountEmployeeDto searchDto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get specific account
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<AccountDto> GetAccount(Guid id) {
        throw new NotImplementedException();
    }

}