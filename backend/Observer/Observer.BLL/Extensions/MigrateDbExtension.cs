using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Observer.DAL;

namespace Observer.BLL.Extensions;

public static class MigrateDbExtension
{
    public static async Task MigrateDbAsync(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();

        // Migrate database
        var context = serviceScope.ServiceProvider.GetService<ObserverDbContext>();
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        await context.Database.MigrateAsync();
    }
}
