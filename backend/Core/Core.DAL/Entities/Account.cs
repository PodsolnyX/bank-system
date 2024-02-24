using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Core.DAL.Entities;

public class Account {
    [Key]
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public CurrencyType CurrencyType { get; set; }
    
    public int Amount { get; set; }
}