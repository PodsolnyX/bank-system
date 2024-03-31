using Common.Enum;

namespace Arbiter.BLL.DataTransferObjects;

public class RequestLoanChargeDto
{
    public Guid UserId { get; set; }
    public Guid LoanId { get; set; }
    public Guid AccountId { get; set; }
    public Guid TariffId { get; set; }
    public long Amount { get; set; }
    public CurrencyType CurrencyType { get; set; }
}
