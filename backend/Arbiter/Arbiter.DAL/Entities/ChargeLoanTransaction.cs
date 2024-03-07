using Common.Enum;

namespace Arbiter.DAL.Entities;

public class ChargeLoanTransaction
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid AccountId { get; set; }
    public Guid TariffId { get; set; }
    public int Amount { get; set; }
    public CurrencyType CurrencyType { get; set; }
    
    public TransactionStatus CheckAccountStatus { get; set; } = TransactionStatus.NotStarted;
    public int CheckAccountRetries { get; set; }
    
    
    public TransactionStatus AccountLoanChargeStatus { get; set; } = TransactionStatus.NotStarted;
    public int AccountLoanChargeRetries { get; set; }
    
    public TransactionStatus LoanChargeStatus { get; set; } = TransactionStatus.NotStarted;
    public int LoanChargeRetries { get; set; }
}