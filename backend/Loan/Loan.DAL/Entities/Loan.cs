using System.ComponentModel.DataAnnotations;
using Common.Enum;
using Common.Persistence;

namespace Loan.DAL.Entities;

public class Loan : BaseEntity
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }

    public Guid AccountId { get; set; }

    public Tariff Tariff { get; set; }
    public List<PaymentRequest> Payments { get; set; } = [];
    public DateTime? LastChargeDate { get; set; }

    public CurrencyType CurrencyType { get; set; }
    public bool IsClosed { get; set; } = false;

    public long Debt { get; set; }
}
