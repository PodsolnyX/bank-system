using Microsoft.EntityFrameworkCore;
using Observer.DAL.Entities;

namespace Observer.DAL;

public class ObserverDbContext : DbContext
{
    public DbSet<HttpRequest> HttpRequests { get; set; }

    public ObserverDbContext(DbContextOptions<ObserverDbContext> options)
        : base(options) { }
}
