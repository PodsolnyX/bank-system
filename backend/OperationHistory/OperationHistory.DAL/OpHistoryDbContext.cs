using Microsoft.EntityFrameworkCore;
using OperationHistory.DAL.Entities;

namespace OperationHistory.DAL;

public class OpHistoryDbContext: DbContext {
    public DbSet<Operation> Operations { get; set; }
    
    public OpHistoryDbContext(DbContextOptions<OpHistoryDbContext> options) : base(options) {
        
    }

}