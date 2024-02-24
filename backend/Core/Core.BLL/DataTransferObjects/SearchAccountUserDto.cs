using Common.DataTransfer;
using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class SearchAccountUserDto: PaginationRequest {
    public List<CurrencyType> CurrencyTypes { get; set; } = [];
}