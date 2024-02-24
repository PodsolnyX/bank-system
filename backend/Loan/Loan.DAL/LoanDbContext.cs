using Microsoft.EntityFrameworkCore;

namespace Loan.DAL;

public class LoanDbContext : DbContext {
    public DbSet<Entities.Loan> Loans { get; set; }
    public DbSet<Entities.Tariff> Tariffs { get; set; }
}