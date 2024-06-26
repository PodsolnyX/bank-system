﻿using System.ComponentModel.DataAnnotations;
using Common.Enum;
using Common.Persistence;

namespace Core.DAL.Entities;

public class Account : BaseEntity
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public CurrencyType CurrencyType { get; set; }

    public long Amount { get; set; }

    public bool IsLockedForTransaction { get; set; }
    public bool IsPriority { get; set; } = false;
}
