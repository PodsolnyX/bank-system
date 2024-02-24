using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class DepositDto {
    public int Amount { get; set; }
    public string? Message { get; set; }
}