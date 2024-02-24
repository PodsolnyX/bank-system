using Core.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Core.API.Controllers;

[Controller]
[Route("account/user")]
public class AccountUserController: ControllerBase {
    /// <summary>
    /// Open account
    /// </summary>
    [HttpPost]
    public Task<AccountDto> OpenAccount(OpenAccountDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Close account
    /// </summary>
    [HttpDelete("{id:guid}")]
    public Task CloseAccount(Guid id) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get user`s accounts
    /// </summary>
    [HttpGet]
    public Task<AccountDto> GetAccounts(SearchAccountUserDto searchDto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Get user`s account
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<AccountDto> GetAccount(Guid id) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Deposit money to account
    /// </summary>
    [HttpPost("{accountId:guid}/deposit")]
    public Task Deposit(Guid accountId, DepositDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Withdraw money from account
    /// </summary>
    [HttpPost("{accountId:guid}/withdraw")]
    public Task Withdraw(Guid accountId, DepositDto dto) {
        throw new NotImplementedException();
    }
}