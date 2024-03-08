using Common.DataTransfer;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class SearchLoanEmployeeDto : PaginationRequest {
    public List<Guid> UserIds { get; set; } = [];

    public List<Guid> AccountIds { get; set; } = [];

    public List<CurrencyType> CurrencyTypes { get; set; } = [];
}