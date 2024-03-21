using Auth.BLL.DataTransferObjects;
using AuthorizationServer.BLL.DataTransferObjects;
using AuthorizationServer.BLL.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;

namespace AuthorizationServer.MVC.Controllers;
[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
[Route("user")]
public class UserController: Controller {
    private readonly UserService _userService;

    public UserController(UserService userService) {
        _userService = userService;
    }
    /// <summary>
    /// Get user profiles
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpGet("profiles")]
    public async Task<List<UserDto>> GetUserProfile(SearchUsersEmployeeDto dto) {
        return await _userService.GetUserProfile(dto);
    }
    /// <summary>
    /// Create user
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost("create")]
    public async Task<Guid> CreateUser(UserCreateDto dto) {
        return await _userService.CreateUser(dto);

    }
    /// <summary>
    /// Ban user
    /// </summary>
    /// <param name="id"></param>
    [HttpDelete("ban")]
    public async Task BanUser(Guid id) {
         await _userService.BanUser(id);
    }
    /// <summary>
    /// Unban user
    /// </summary>
    /// <param name="id"></param>
    [HttpPost("unban")]
    public async Task UnBan(Guid id) {
         await _userService.UnBanUser(id);
    }
}