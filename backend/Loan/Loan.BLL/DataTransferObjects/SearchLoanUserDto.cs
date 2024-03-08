using Common.DataTransfer;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class SearchLoanUserDto : PaginationRequest {
    public List<Guid> AccountIds { get; set; } = [];

    public List<CurrencyType> CurrencyTypes { get; set; } = [];
}