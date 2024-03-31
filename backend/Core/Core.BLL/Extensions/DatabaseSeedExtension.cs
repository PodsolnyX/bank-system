using Common.Enum;
using Core.DAL;
using Core.DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Core.BLL.Extensions;

public static class DatabaseSeedExtension {
    public static async Task ConfigureDatabaseSeed(this WebApplication app) {
        using var serviceScope = app.Services.CreateScope();

        var dbContext = serviceScope.ServiceProvider.GetService<CoreDbContext>();
        if (dbContext == null) {
            throw new ArgumentNullException();
        }

        var guid = new Guid("F6AB14AA-4634-4644-A6A9-2F84D8A878DB");
        if (dbContext.Accounts.Any(a=>a.Id == guid))
            return;
        
        dbContext.Add(new Account {
            Id = guid,
            UserId = Guid.Empty,
            CurrencyType = CurrencyType.Rub,
            Amount = 10000000,
            IsLockedForTransaction = false,
            IsPriority = true
        });
        await dbContext.SaveChangesAsync();
    }
}