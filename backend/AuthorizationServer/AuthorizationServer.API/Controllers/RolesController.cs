using AuthorizationServer.BLL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace AuthorizationServer.MVC.Controllers;

[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
public class RolesController : Controller
{
    private readonly RoleService _roleService;

    public RolesController(RoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet("roles")]
    public List<string?> GetRoles()
    {
        return _roleService.GetRoles();
    }

    [HttpGet("/users/{userId}/roles")]
    public async Task<List<string>> GetUserRoles([FromRoute] string userId)
    {
        return await _roleService.GetUserRoles(userId);
    }

    [HttpPost("/users/{userId}/role/{roleName}")]
    public async Task AddUserToRole([FromRoute] string userId, [FromRoute] string roleName)
    {
        await _roleService.AddUserToRole(userId, roleName);
    }

    [HttpDelete("/users/{userId}/role/{roleName}")]
    public async Task RemoveUserFromRole([FromRoute] string userId, [FromRoute] string roleName)
    {
        await _roleService.RemoveUserFromRole(userId, roleName);
    }
}
