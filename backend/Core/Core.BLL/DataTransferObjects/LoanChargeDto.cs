using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class LoanChargeDto {
    public Guid LoanId { get; set; }
    public int Amount { get; set; }
}