using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class LoanIncomeDto {
    public Guid LoanId { get; set; }
    public int Amount { get; set; }
}