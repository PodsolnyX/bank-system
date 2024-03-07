using Microsoft.EntityFrameworkCore;

namespace Arbiter.DAL;

public class ArbiterDbContext : DbContext {
    public DbSet<Entities.RequestLoanTransaction> RequestLoanTransactions { get; set; }
    public DbSet<Entities.ChargeLoanTransaction> ChargeLoanTransactions { get; set; }
    public ArbiterDbContext(DbContextOptions<ArbiterDbContext> options) : base(options) {
    }
}