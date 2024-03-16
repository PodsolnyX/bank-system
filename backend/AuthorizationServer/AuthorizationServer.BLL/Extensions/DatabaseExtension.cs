using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AuthorizationServer.BLL.Extensions;

public static class DatabaseExtension
{
    public static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddDbContext<IdentityDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("Database"));
            options.UseOpenIddict();
        });

        return services;
    }

    public static async Task CreateDbAsync(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();

        // Migrate database
        var context = serviceScope.ServiceProvider.GetService<IdentityDbContext>();
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        await context.Database.EnsureCreatedAsync();
    }
}
