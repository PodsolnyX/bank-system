﻿using Core.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.DAL;

public class CoreDbContext : DbContext {
    public DbSet<Account> Accounts { get; set; }
    
    public CoreDbContext(DbContextOptions<CoreDbContext> options) : base(options) {
    }
}