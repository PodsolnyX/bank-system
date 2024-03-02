using System.Buffers;
using Common.Enum;
using OperationStatus = Common.Enum.OperationStatus;

namespace OperationHistory.DAL.Entities;

public class Operation {
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AccountId { get; set; }
    public Guid? LoanId { get; set; }
    public OperationType Type { get; set; }
    public OperationStatus Status { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
}