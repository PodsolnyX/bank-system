using Common.DataTransfer;
using Common.Enum;

namespace Core.BLL.DataTransferObjects;

public class SearchAccountEmployeeDto: PaginationRequest {
    public List<CurrencyType> CurrencyTypes { get; set; } = [];
    public List<Guid> UserIds { get; set; } = [];
}