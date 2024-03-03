using Auth.BLL.DataTransferObjects;
using Auth.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Auth.API.Controllers;

/// <summary>
/// Controller for employee
/// </summary>
[Controller]
[Route("auth/employee")]
public class EmployeeController: ControllerBase {
    private readonly UserService _userService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="userService"></param>
    public EmployeeController(UserService userService) {
        _userService = userService;
    }

    /// <summary>
    /// Get users
    /// </summary>
    [HttpGet]
    public async Task<List<UserDto>> GetUserProfile(SearchUsersEmployeeDto dto) {
        return await _userService.GetUserProfile(dto);
    }
    
    /// <summary>
    /// Create user
    /// </summary>
    [HttpPost]
    public async Task<Guid> CreateUser(UserCreateDto dto) {    
        return await _userService.CreateUser(dto);
    }
    
    /// <summary>
    /// Ban user
    /// </summary>
    [HttpPost("{userId:guid}")]
    public async Task BanUser(Guid userId) {    
         await _userService.BanUser(userId);
    }
}