using Common.Enum;
using Common.Persistence;
using OperationStatus = Common.Enum.OperationStatus;

namespace OperationHistory.DAL.Entities;

public class Operation : BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid AccountId { get; set; }
    public Guid? LoanId { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public OperationType Type { get; set; }
    public OperationStatus Status { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
    public DateTime DateTime { get; set; }
}
