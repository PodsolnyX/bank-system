using Common.Persistence;

namespace Loan.DAL.Entities;

public class PaymentRequest : BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Loan Loan { get; set; }
    public long CurrentDebt { get; set; } // сумма на момент создания ревеста
    public long AmountForPay { get; set; } // сколько нужно заплатить
    public long AlreadyPaid { get; set; } // сколько заплатилр
    public bool IsActual { get; set; } // текущая заявка
    public long PenaltyFee { get; set; }
    public DateTime? PaidAt { get; set; } // во сколько заплатил
}
