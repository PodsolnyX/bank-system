using System.Security.Claims;
using Auth.BLL.DataTransferObjects;
using AuthorizationServer.BLL.DataTransferObjects;
using Common.DataTransfer;
using Common.Exception;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OpenIddict.Abstractions;

namespace AuthorizationServer.BLL.Services;

public class UserService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly ILogger<UserService> _logger;
    private readonly IdentityDbContext _dbContext;

    public UserService(
        UserManager<IdentityUser> userManager,
        ILogger<UserService> logger,
        SignInManager<IdentityUser> signInManager,
        IdentityDbContext dbContext
    ) {
        _dbContext = dbContext;
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

            var claims = new List<Claim> { new(OpenIddictConstants.Claims.Subject, user.Id), };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            await _signInManager.SignInWithClaimsAsync(
                user,
                new AuthenticationProperties() { ExpiresUtc = DateTimeOffset.UtcNow.AddHours(1) },
                claims
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
    
    public async Task<List<UserDto>> GetUserProfile(SearchUsersEmployeeDto dto) {

        var empRole = _dbContext.Roles.FirstOrDefault(e => e.Name == "Employee");

        var users = await _dbContext
            .Users.Where( u=>
                (dto.UserIds.Count == 0 || dto.UserIds.Contains(new Guid(u.Id)))
                && (string.IsNullOrEmpty(dto.Mail) || u.Email!.Contains(dto.Mail))
                && (string.IsNullOrEmpty(dto.Name) || (u.UserName != null && u.UserName.Contains(dto.Name)))
                && (dto.IsBanned == null || (dto.IsBanned == u.LockoutEnd.HasValue))
                && (dto.IsEmployee == null || (dto.IsEmployee.Value && 
                                               _dbContext.UserRoles.Any(e => e.RoleId == empRole.Id && e.UserId == u.Id)))
            )
            .ToPagedList(dto);

        return users.Select(user => new UserDto {
            Id = new Guid(user.Id),
            Mail = user.Email,
            Name = user.UserName,
            IsEmployee =  _userManager.IsInRoleAsync(user, "Employee").Result,
            BannedAt = user.LockoutEnd
        }).ToList();
    }
    
    public async Task<Guid> CreateUser(UserCreateDto dto) {    
        var user = new IdentityUser() {
            Email = dto.Mail,
            UserName = dto.Name,
        };
        await _userManager.CreateAsync(user, "12345");
        await _userManager.AddToRoleAsync(user, "Client");
        if (dto.IsEmployee)
            await _userManager.AddToRoleAsync(user, "Employee");
        return new Guid(user.Id);
    }
    
    public async Task BanUser(Guid id) {    
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            throw new NotFoundException("User not found");
        if (await _userManager.IsLockedOutAsync(user))
            throw new ForbiddenException("Already banned");
        await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.MaxValue);
    }    
    public async Task UnBanUser(Guid id) {    
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            throw new NotFoundException("User not found");
        if (!await _userManager.IsLockedOutAsync(user))
            throw new ForbiddenException("Not banned");
        user.LockoutEnd = null;
        await _userManager.UpdateAsync(user);
    }
}
