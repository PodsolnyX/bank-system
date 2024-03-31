using Common.Enum;
using Core.DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using OperationHistory.DAL;
using OperationHistory.DAL.Entities;

namespace OperationHistory.BLL.Extensions;

public static class SeedDatabaseExtension {
    public static async Task ConfigureDatabaseSeed(this WebApplication app) {
        using var serviceScope = app.Services.CreateScope();

        var dbContext = serviceScope.ServiceProvider.GetService<OpHistoryDbContext>();
        if (dbContext == null) {
            throw new ArgumentNullException();
        }

        var guid = new Guid("1667EEA9-1580-4C71-974C-00700F79550A");
        if (dbContext.Operations.Any(a=>a.Id == guid))
            return;

        dbContext.Add(new Operation {
            CreatedAt = DateTime.UtcNow,
            Id = guid,
            TransactionId = Guid.Empty,
            UserId = Guid.Empty,
            AccountId = new Guid("f6ab14aa-4634-4644-a6a9-2f84d8a878db"),
            CurrencyType = CurrencyType.Rub,
            Type = OperationType.Deposit,
            Reason = OperationReason.Cash,
            Status = OperationStatus.Success,
            Amount = 10000000,
            Message = "Базовое пополнение счета мастер-счета"
        });
        await dbContext.SaveChangesAsync();
    }
}