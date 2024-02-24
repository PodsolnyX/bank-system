using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class AccountDto {
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public int Amount { get; set; }
}