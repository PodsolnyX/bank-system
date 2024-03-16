using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using OpenIddict.Abstractions;

namespace AuthorizationServer.BLL.Services;

public class UserService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly ILogger<UserService> _logger;

    public UserService(
        UserManager<IdentityUser> userManager,
        ILogger<UserService> logger,
        SignInManager<IdentityUser> signInManager
    )
    {
        _userManager = userManager;
        _logger = logger;
        _signInManager = signInManager;
        _signInManager.AuthenticationScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    }

    public async Task Register(string email, string password)
    {
        var user = new IdentityUser { UserName = email, Email = email, };

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Client");
            await Login(email, password);
            return;
        }

        _logger.LogError(result.Errors.First().Description);
        throw new Exception(result.Errors.First().Description);
    }

    public async Task Login(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            _logger.LogError("User not found");
            throw new Exception("User not found");
        }

        if (await _userManager.CheckPasswordAsync(user, password))
        {
            _logger.LogInformation("User logged in");
            await _signInManager.SignInWithClaimsAsync(
                user,
                null,
                new List<Claim> { new(OpenIddictConstants.Claims.Subject, user.Id), }
            );
            return;
        }

        _logger.LogError("Invalid email or password");
        throw new Exception("Invalid email or password");
    }

    public async Task Logout()
    {
        await _signInManager.SignOutAsync();
    }

    public async Task<List<string>> GetRoles(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        return user == null ? [] : (await _userManager.GetRolesAsync(user)).ToList();
    }
}
