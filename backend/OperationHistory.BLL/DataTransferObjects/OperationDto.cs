using Common.Enum;

namespace OperationHistory.BLL.DataTransferObjects;

public class OperationDto {
    public Guid Id { get; set; }
    public Guid AccountId { get; set; }
    public Guid? LoanId { get; set; }
    public OperationType Type { get; set; }
    public OperationStatus Status { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
    
}