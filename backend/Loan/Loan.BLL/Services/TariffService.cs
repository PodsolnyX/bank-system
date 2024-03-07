using Common.DataTransfer;
using Common.Exception;
using Loan.BLL.DataTransferObjects;
using Loan.DAL;
using Loan.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loan.BLL.Services;

public class TariffService {
    private readonly LoanDbContext _dbContext;
    public TariffService(LoanDbContext dbContext) {
        _dbContext = dbContext;
    }

    public async Task CreateTariff(TariffCreateDto dto) {
        var tariff = new Tariff {
            Name = dto.Name,
            PeriodInDays = dto.PeriodInDays,
            InterestRate = dto.InterestRate,
            CurrencyTypes = dto.CurrencyTypes
        };
        await _dbContext.AddAsync(tariff);
        await _dbContext.SaveChangesAsync();
    }
    public async Task DeleteTariff(Guid id) {
        var tariff = await _dbContext.Tariffs
            .FirstOrDefaultAsync(t => t.Id == id);
        if (tariff == null)
            throw new NotFoundException("Tariff not found");
        tariff.DeletedAt = DateTime.UtcNow;
        _dbContext.Update(tariff);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task<TariffDto> GetTariff(Guid id) {
        var tariff = await _dbContext.Tariffs
            .FirstOrDefaultAsync(t => t.Id == id && !t.DeletedAt.HasValue);
        if (tariff == null)
            throw new NotFoundException("Tariff not found");
        return new TariffDto {
            Id = tariff.Id,
            Name = tariff.Name,
            PeriodInDays = tariff.PeriodInDays,
            InterestRate = tariff.InterestRate,
            CurrencyTypes = tariff.CurrencyTypes
        };
    }
    
    public async Task<List<TariffDto>> GetTariffs(SearchTariffDto dto) {
        var tariffs = await _dbContext.Tariffs
            .Where(t => !t.DeletedAt.HasValue
                        && dto.TariffIds.Contains(t.Id)
                        && (string.IsNullOrEmpty(dto.Name) || t.Name.Contains(dto.Name))
                        && ((dto.PeriodInDays == null || dto.PeriodInDays == 0) || t.PeriodInDays == dto.PeriodInDays)
                        && ((dto.InterestRate == null || dto.InterestRate == 0)
                            || Math.Abs(t.InterestRate - dto.InterestRate.Value) < 0.000001)
                        && (dto.CurrencyTypes.Count == 0 || dto.CurrencyTypes.Any(ct => t.CurrencyTypes.Contains(ct)))
            )
            .ToPagedList(dto);
        return tariffs.Select(t => new TariffDto {
            Id = t.Id,
            Name = t.Name,
            PeriodInDays = t.PeriodInDays,
            InterestRate = t.InterestRate,
            CurrencyTypes = t.CurrencyTypes
        }).ToList();
    }
    
    public async Task<TariffDto> GetTariffUser(Guid id) {
        throw new NotImplementedException();
    }

    public async Task<List<TariffDto>> GetTariffsUser(SearchTariffDto dto) {
        var tariffs = await _dbContext.Tariffs
            .Where(t => !t.DeletedAt.HasValue
                        && dto.TariffIds.Contains(t.Id)
                        && (string.IsNullOrEmpty(dto.Name) || t.Name.Contains(dto.Name))
                        && ((dto.PeriodInDays == null || dto.PeriodInDays == 0) || t.PeriodInDays == dto.PeriodInDays)
                        && ((dto.InterestRate == null || dto.InterestRate == 0)
                            || Math.Abs(t.InterestRate - dto.InterestRate.Value) < 0.000001)
                        && (dto.CurrencyTypes.Count == 0 || dto.CurrencyTypes.Any(ct => t.CurrencyTypes.Contains(ct)))
            )
            .ToPagedList(dto);
        return tariffs.Select(t => new TariffDto {
            Id = t.Id,
            Name = t.Name,
            PeriodInDays = t.PeriodInDays,
            InterestRate = t.InterestRate,
            CurrencyTypes = t.CurrencyTypes
        }).ToList();
    }
}