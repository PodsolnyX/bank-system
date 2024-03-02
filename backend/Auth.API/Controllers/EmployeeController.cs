using Auth.BLL.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace Auth.API.Controllers;

[ApiController]
[Route("auth/employee")]
public class EmployeeController: ControllerBase {
    
    /// <summary>
    /// Get users
    /// </summary>
    [HttpGet]
    public Task<List<UserDto>> GetUserProfile(SearchUsersEmployeeDto dto) {
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Create user
    /// </summary>
    [HttpPost]
    public Task<Guid> CreateUser(UserCreateDto dto) {    
        throw new NotImplementedException();
    }
    
    /// <summary>
    /// Ban user
    /// </summary>
    [HttpPost("{userId:guid}")]
    public Task BanUser(Guid id) {    
        throw new NotImplementedException();
    }
}