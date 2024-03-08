using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class AccountModificationDto
{
    public OperationType Type { get; set; }
    public OperationReason Reason { get; set; }
    public Guid? LoanId { get; set; }
    public Guid? TransactionId { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
}
