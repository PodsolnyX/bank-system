using Common.Enum;

namespace Common.DataTransfer;

public class OperationHistoryMessage
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid AccountId { get; set; }
    public Guid? LoanId { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public OperationType OperationType { get; set; }
    public OperationStatus OperationStatus { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
    public DateTime DateTime { get; set; }
}
