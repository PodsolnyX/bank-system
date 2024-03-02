using Common.DataTransfer;
using Common.Enum;

namespace OperationHistory.BLL.DataTransferObjects;

public class SearchOperationEmployeeDto: PaginationRequest {
    public List<Guid> UserIds { get; set; } = [];
    public List<Guid> AccountIds { get; set; } = [];
    public List<Guid> LoanIds { get; set; } = [];
    public List<OperationType> OperationTypes { get; set; } = [];
    public List<OperationStatus> OperationStatuses { get; set; } = [];
}