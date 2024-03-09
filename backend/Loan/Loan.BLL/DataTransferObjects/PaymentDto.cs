namespace Loan.BLL.DataTransferObjects;

public class PaymentDto {
    public Guid Id { get; set; } = Guid.NewGuid();
    public LoanDto Loan { get; set; }
    public int AmountForPay { get; set; } // сколько нужно заплатить
    public int AlreadyPaid { get; set; } // сколько заплатил
    public DateTime? PaidAt { get; set; } // во сколько заплатил
    public bool IsActual { get; set; } // текущая заявка
    public int PenaltyFee { get; set; }
    public DateTime CreatedAt { get; set; }
}