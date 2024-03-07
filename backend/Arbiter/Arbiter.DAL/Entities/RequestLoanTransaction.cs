using Common.Enum;

namespace Arbiter.DAL.Entities;

public class RequestLoanTransaction
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid AccountId { get; set; }
    public Guid TariffId { get; set; }
    public Guid LoanId { get; set; }
    public int Amount { get; set; }
    public CurrencyType CurrencyType { get; set; }

    public TransactionStatus CheckAccountStatus { get; set; } = TransactionStatus.NotStarted;
    public int CheckAccountRetries { get; set; }
    
    public TransactionStatus TakeLoanStatus { get; set; }  = TransactionStatus.NotStarted;
    public int TakeLoanRetries { get; set; }
    
    public TransactionStatus AccountLoanIncomeStatus { get; set; }  = TransactionStatus.NotStarted;
    public int AccountLoanIncomeRetries { get; set; }
}