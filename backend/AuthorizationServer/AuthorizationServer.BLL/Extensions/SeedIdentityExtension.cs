using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AuthorizationServer.BLL.Extensions;

public static class SeedIdentityExtension
{
    public static async Task SeedIdentity(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();

        var roleManager = serviceScope.ServiceProvider.GetRequiredService<
            RoleManager<IdentityRole>
        >();

        if (await roleManager.FindByNameAsync("Employee") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("Employee"));
        }

        if (await roleManager.FindByNameAsync("Client") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("Client"));
        }
    }

    public static async Task SeedAdmin(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();

        var userManager = serviceScope.ServiceProvider.GetRequiredService<
            UserManager<IdentityUser>
        >();

        if (await userManager.FindByNameAsync("admin") != null)
        {
            return;
        }

        var user = new IdentityUser() { UserName = "admin", Email = "admin@mail.com" };
        await userManager.CreateAsync(user, "admin");
        await userManager.AddToRoleAsync(user, "Employee");
    }
}
