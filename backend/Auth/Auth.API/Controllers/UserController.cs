using Auth.BLL.DataTransferObjects;
using Auth.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Auth.API.Controllers;


/// <summary>
/// Controller for user
/// </summary>
[ApiController]
[Route("auth/user")]
public class UserController: ControllerBase {
    private readonly UserService _userService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="userService"></param>
    public UserController(UserService userService) {
        _userService = userService;
    }

    /// <summary>
    /// Get my profile (OpenId auth)
    /// </summary>
    [HttpGet]
    public async Task<UserDto> GetUserProfile(string mail) {
        return await _userService.GetUserProfile(mail);
    }
    
    /// <summary>
    /// Register user (create account)
    /// </summary>
    [HttpPost]
    public async Task<Guid> Register(UserRegisterDto dto) {    
        return await _userService.Register(dto);
    }
}