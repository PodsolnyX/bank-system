using Microsoft.EntityFrameworkCore;

namespace Loan.DAL;

public class LoanDbContext : DbContext {
    public DbSet<Entities.Loan> Loans { get; set; }
    public DbSet<Entities.Tariff> Tariffs { get; set; }
    public DbSet<Entities.PaymentRequest> Payments { get; set; }
    
    public LoanDbContext(DbContextOptions<LoanDbContext> options) : base(options) {
    }
}