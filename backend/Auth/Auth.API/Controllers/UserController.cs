using Auth.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Auth.API.Controllers;


[ApiController]
[Route("auth/user")]
public class UserController: ControllerBase {
    
    /// <summary>
    /// Get my profile (OpenId auth)
    /// </summary>
    [HttpGet]
    public Task<UserDto> GetUserProfile(string mail) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Register user (create account)
    /// </summary>
    [HttpPost]
    public Task<Guid> Register(UserRegisterDto dto) {    
        throw new NotImplementedException();
    }
}