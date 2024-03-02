using Common.Enum;

namespace Arbiter.BLL.DataTransferObjects;

public class RequestLoanDto
{
    public Guid AccountId { get; set; }
    public Guid TariffId { get; set; }
    public int Amount { get; set; }
    public CurrencyType CurrencyType { get; set; }
}