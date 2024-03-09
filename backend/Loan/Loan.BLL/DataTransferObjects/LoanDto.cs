using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class LoanDto {
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public Guid AccountId { get; set; }
    
    public TariffDto Tariff { get; set; }
    
    public DateTime? LastChargeDate { get; set; }
    
    public CurrencyType CurrencyType { get; set; }
    
    public int Debt { get; set; }
}