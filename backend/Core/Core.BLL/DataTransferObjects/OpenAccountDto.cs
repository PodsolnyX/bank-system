using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class OpenAccountDto {
    public Guid UserId { get; set; }
    public CurrencyType CurrencyType { get; set; }
}