using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Loan.DAL.Entities;

public class Loan {
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public Guid UserId { get; set; }
    
    public Guid AccountId { get; set; }
    
    public Tariff Tariff { get; set; }
    
    public DateTime? LastChargeDate { get; set; }
    
    public CurrencyType CurrencyType { get; set; }
    
    public int Debt { get; set; }
}