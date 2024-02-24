using Common.DataTransfer;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class SearchTariffDto : PaginationRequest{
    public string? Name { get; set; }
    
    public int? PeriodInDays { get; set; } 
    
    public double? InterestRate { get; set; } 

    public List<CurrencyType>? CurrencyTypes { get; set; } = [];
}