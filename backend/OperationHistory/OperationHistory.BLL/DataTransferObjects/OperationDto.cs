using Common.Enum;
using OperationHistory.DAL.Entities;
using OperationStatus = Common.Enum.OperationStatus;

namespace OperationHistory.BLL.DataTransferObjects;

public class OperationDto
{
    public Guid Id { get; set; }
    public Guid AccountId { get; set; }
    public Guid? LoanId { get; set; }
    public OperationType Type { get; set; }
    public OperationReason Reason { get; set; }
    public OperationStatus Status { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
    public DateTime? CreatedAt { get; set; }
}

public static class OperationDtoExtensions
{
    public static OperationDto ToDto(this Operation operation)
    {
        return new OperationDto
        {
            Id = operation.Id,
            AccountId = operation.AccountId,
            LoanId = operation.LoanId,
            Type = operation.Type,
            Reason = operation.Reason,
            Status = operation.Status,
            CurrencyType = operation.CurrencyType,
            Amount = operation.Amount,
            Message = operation.Message,
            CreatedAt = operation.CreatedAt
        };
    }
}
