using System.ComponentModel.DataAnnotations;
using Common.Enum;
using Common.Persistence;

namespace Loan.DAL.Entities;

public class Tariff: BaseEntity {
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public string Name { get; set; }
    
    public int PeriodInDays { get; set; } 
    
    public double InterestRate { get; set; } 

    public List<CurrencyType> CurrencyTypes { get; set; } = [];
    public List<Loan> Loans { get; set; } = [];
}