using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class TariffCreateDto {
    [Required]
    public string Name { get; set; }
    
    [Required]
    [Range(1, Int32.MaxValue - 1)]
    public int PeriodInDays { get; set; } 
    
    [Required]
    public double InterestRate { get; set; } 

    [Required]
    public List<CurrencyType> CurrencyTypes { get; set; } = [];
}