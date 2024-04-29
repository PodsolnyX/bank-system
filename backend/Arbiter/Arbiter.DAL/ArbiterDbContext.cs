using Arbiter.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Arbiter.DAL;

public class ArbiterDbContext : DbContext {
    public DbSet<RequestLoanTransaction> RequestLoanTransactions { get; set; }
    public DbSet<ChargeLoanTransaction> ChargeLoanTransactions { get; set; }
    public DbSet<CircuitBreaker> CircuitBreaker { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CircuitBreaker>().HasData( new CircuitBreaker());
    }
    public ArbiterDbContext(DbContextOptions<ArbiterDbContext> options) : base(options) {
    }
}