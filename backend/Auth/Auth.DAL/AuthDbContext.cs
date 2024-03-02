using Auth.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Auth.DAL;

public class OpHistoryDbContext: DbContext {
    public DbSet<User> Users { get; set; }
    
    public OpHistoryDbContext(DbContextOptions<OpHistoryDbContext> options) : base(options) {
        
    }

}