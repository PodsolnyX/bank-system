namespace Loan.BLL.DataTransferObjects;

public class SearchPaymentDto {
    public List<Guid> LoanIds { get; set; } = [];
    public bool OnlyActual { get; set; } = true;
}