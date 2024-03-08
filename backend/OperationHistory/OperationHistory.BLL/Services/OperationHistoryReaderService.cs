using Common.DataTransfer;
using OperationHistory.BLL.DataTransferObjects;
using OperationHistory.DAL;

namespace OperationHistory.BLL.Services;

public class OperationHistoryReaderService
{
    private readonly OpHistoryDbContext _dbContext;

    public OperationHistoryReaderService(OpHistoryDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<OperationDto>> GetOperations(
        Guid userId,
        SearchOperationUserDto searchDto
    )
    {
        var operations = await _dbContext
            .Operations.Where(e =>
                e.UserId == userId
                && !e.DeletedAt.HasValue
                && (searchDto.AccountIds.Count == 0 || searchDto.AccountIds.Contains(e.AccountId))
                && (
                    searchDto.LoanIds.Count == 0
                    || (e.LoanId != null && searchDto.LoanIds.Contains(e.LoanId.Value))
                )
                && (
                    searchDto.OperationStatuses.Count == 0
                    || searchDto.OperationStatuses.Contains(e.Status)
                )
                && (searchDto.CurrencyTypes.Count == 0 || searchDto.OperationTypes.Contains(e.Type))
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return operations.Select(e => e.ToDto()).ToList();
    }

    public async Task<List<OperationDto>> GetOperations(SearchOperationEmployeeDto searchDto)
    {
        var operations = await _dbContext
            .Operations.Where(e =>
                !e.DeletedAt.HasValue
                && (searchDto.AccountIds.Count == 0 || searchDto.AccountIds.Contains(e.AccountId))
                && (
                    searchDto.LoanIds.Count == 0
                    || (e.LoanId != null && searchDto.LoanIds.Contains(e.LoanId.Value))
                )
                && (searchDto.UserIds.Count == 0 || searchDto.UserIds.Contains(e.UserId))
                && (
                    searchDto.OperationStatuses.Count == 0
                    || searchDto.OperationStatuses.Contains(e.Status)
                )
                && (searchDto.CurrencyTypes.Count == 0 || searchDto.OperationTypes.Contains(e.Type))
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return operations.Select(e => e.ToDto()).ToList();
    }
}
