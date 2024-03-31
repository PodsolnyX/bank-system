using Microsoft.AspNetCore.Identity;

namespace AuthorizationServer.BLL.Services;

public class RoleService
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    public RoleService(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    public List<string?> GetRoles()
    {
        return _roleManager.Roles.Select(r => r.Name).ToList();
    }

    public async Task<List<string>> GetUserRoles(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new Exception("User does not exist");
        }

        return (await _userManager.GetRolesAsync(user)).ToList();
    }

    public async Task AddUserToRole(string userId, string roleName)
    {
        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            throw new Exception("Role does not exist");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new Exception("User does not exist");
        }

        await _userManager.AddToRoleAsync(user, roleName);
    }

    public async Task RemoveUserFromRole(string userId, string roleName)
    {
        if (!await _roleManager.RoleExistsAsync(roleName))
        {
            throw new Exception("Role does not exist");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new Exception("User does not exist");
        }

        await _userManager.RemoveFromRoleAsync(user, roleName);
    }
}
