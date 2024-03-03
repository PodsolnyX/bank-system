using Common.DataTransfer;
using OperationHistory.BLL.DataTransferObjects;
using OperationHistory.DAL;

namespace OperationHistory.BLL.Services;

public class OperationHistoryService
{
    private readonly OpHistoryDbContext _dbContext;

    public OperationHistoryService(OpHistoryDbContext dbContext)
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
                    searchDto.OperationStatuses.Count == 0
                    || searchDto.OperationStatuses.Contains(e.Status)
                )
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.OperationTypes.Contains(e.Type)
                )
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return operations
            .Select(e => new OperationDto
            {
                Id = e.Id,
                AccountId = e.AccountId,
                LoanId = e.LoanId,
                Type = e.Type,
                Status = e.Status,
                CurrencyType = e.CurrencyType,
                Amount = e.Amount,
                Message = e.Message
            })
            .ToList();
    }

    public async Task<List<OperationDto>> GetOperations(SearchOperationEmployeeDto searchDto)
    {
        var operations = await _dbContext
            .Operations.Where(e =>
                !e.DeletedAt.HasValue
                && (searchDto.AccountIds.Count == 0 || searchDto.AccountIds.Contains(e.AccountId))
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

        return operations
            .Select(e => new OperationDto
            {
                Id = e.Id,
                AccountId = e.AccountId,
                LoanId = e.LoanId,
                Type = e.Type,
                Status = e.Status,
                CurrencyType = e.CurrencyType,
                Amount = e.Amount,
                Message = e.Message
            })
            .ToList();
    }
}
