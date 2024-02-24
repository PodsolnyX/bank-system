using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class TariffDto {
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public int PeriodInDays { get; set; } 
    
    public double InterestRate { get; set; } 

    public List<CurrencyType> CurrencyTypes { get; set; } = [];
}