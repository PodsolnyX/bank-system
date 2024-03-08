using System.ComponentModel.DataAnnotations;
using Common.Enum;
using Common.Persistence;
using OperationStatus = Common.Enum.OperationStatus;

namespace OperationHistory.DAL.Entities;

public class Operation : BaseEntity
{
    /// <summary>
    /// Identifier of the operation.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>
    /// Used to group operations that are part of the same transaction.
    /// </summary>
    public Guid TransactionId { get; set; }

    /// <summary>
    /// User identifier.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Account identifier.
    /// </summary>
    public Guid AccountId { get; set; }

    /// <summary>
    /// Loan identifier.
    /// </summary>
    public Guid? LoanId { get; set; }

    /// <summary>
    /// Currency type of the operation.
    /// </summary>
    public CurrencyType CurrencyType { get; set; }

    /// <summary>
    /// Type of the operation. Deposit or Withdraw.
    /// </summary>
    public OperationType Type { get; set; }

    /// <summary>
    /// Reason of the operation. Loan, Cash, etc.
    /// </summary>
    public OperationReason Reason { get; set; }

    /// <summary>
    /// Operation status. Success, Failed, Processing.
    /// </summary>
    public OperationStatus Status { get; set; }

    /// <summary>
    /// Amount of money involved in the operation.
    /// </summary>
    public int Amount { get; set; }

    /// <summary>
    /// Message of the operation.
    /// </summary>
    [MaxLength(250)]
    public string? Message { get; set; }
}
