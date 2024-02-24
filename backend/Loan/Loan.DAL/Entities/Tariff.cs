using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Loan.DAL.Entities;

public class Tariff {
    [Key]
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public int PeriodInDays { get; set; } 
    
    public double InterestRate { get; set; } 

    public List<CurrencyType> CurrencyTypes { get; set; } = [];
}