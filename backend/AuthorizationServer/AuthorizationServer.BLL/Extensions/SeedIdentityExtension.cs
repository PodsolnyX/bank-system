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
}
