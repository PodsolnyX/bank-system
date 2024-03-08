using Common.Enum;
using Common.Persistence;

namespace OperationHistory.DAL.Entities;

public class OperationAggregation : BaseEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid AccountId { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public int CalculatedAmount { get; set; }
    public DateTime LastOperationDate { get; set; }
}
