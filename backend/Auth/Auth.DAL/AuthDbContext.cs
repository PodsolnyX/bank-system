using Auth.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Auth.DAL;

public class AuthDbContext: DbContext {
    public DbSet<User> Users { get; set; }
    
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) {
    }
}