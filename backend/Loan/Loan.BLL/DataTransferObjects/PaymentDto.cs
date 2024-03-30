namespace Loan.BLL.DataTransferObjects;

public class PaymentDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public LoanDto Loan { get; set; }
    public long AmountForPay { get; set; } // сколько нужно заплатить
    public long AlreadyPaid { get; set; } // сколько заплатил
    public DateTime? PaidAt { get; set; } // во сколько заплатил
    public bool IsActual { get; set; } // текущая заявка
    public long PenaltyFee { get; set; }
    public DateTime CreatedAt { get; set; }
}
