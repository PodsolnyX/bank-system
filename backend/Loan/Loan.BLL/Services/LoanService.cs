using System.Net.Http.Json;
using System.Text;
using Common.DataTransfer;
using Common.Enum;
using Common.Exception;
using Loan.BLL.DataTransferObjects;
using Loan.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Loan.BLL.Services;

public  class LoanService {
    private readonly LoanDbContext _dbContext;
    private readonly IOptions<InternalApiQuery> _options;
    public  LoanService(LoanDbContext dbContext, IOptions<InternalApiQuery> options) {
        _dbContext = dbContext;
        _options = options;
    }
    public async Task RequestLoan(RequestLoanDto dto) {
        var tariff = await _dbContext.Tariffs.FirstOrDefaultAsync(t => t.Id == dto.TariffId);
        if (tariff == null)
            throw new NotFoundException("Tariff not found");
        var httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri(_options.Value.BaseUrlArbiter);
        var jsonDto = JsonConvert.SerializeObject(dto);
        var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync($"{_options.Value.BaseArbiterController}loan", content);
        if (!response.IsSuccessStatusCode)
            throw new BadRequestException(response.ReasonPhrase +" ////// "+ response.RequestMessage);
    }
    
    public async Task ChargeLoan(LoanChargeDto dto) {
        var loan = await _dbContext.Loans
            .FirstOrDefaultAsync(l => l.Id == dto.LoanId);
        if (loan == null)
            throw new NotFoundException("Loan not found");
        if (dto.Amount > loan.Debt)
            throw new BadRequestException("Loan debt < charge amount");
        
        var httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri(_options.Value.BaseUrlArbiter);
        var jsonDto = JsonConvert.SerializeObject(dto);
        var content = new StringContent(jsonDto, Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync($"{_options.Value.BaseArbiterController}loan-charge", content);
        if (!response.IsSuccessStatusCode)
            throw new BadRequestException();
    }
    

    /*public async Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }*/
    

    public async Task<List<LoanDto>> GetLoansUser(SearchLoanUserDto dto, Guid userId) {
        var loans = await _dbContext.Loans
            .Include(l=>l.Tariff)
            .Where(l => l.UserId == userId
                        && (dto.AccountIds.Count == 0 || dto.AccountIds.Contains(l.Id))
                        && (dto.CurrencyTypes.Count == 0 || dto.CurrencyTypes.Contains(l.CurrencyType)))
            .ToPagedList(dto);
        return loans.Select(l =>
            new LoanDto {
                Id = l.Id,
                UserId = l.UserId,
                AccountId = l.AccountId,
                Tariff = new TariffDto {
                    Id = l.Tariff.Id,
                    Name = l.Tariff.Name,
                    PeriodInDays = l.Tariff.PeriodInDays,
                    InterestRate = l.Tariff.InterestRate,
                    CurrencyTypes = l.Tariff.CurrencyTypes
                },
                LastChargeDate = l.LastChargeDate,
                CurrencyType = l.CurrencyType,
                Debt = l.Debt
            }).ToList();
    }
    public async Task<List<LoanDto>> GetLoans(SearchLoanEmployeeDto dto) {
        var loans = await _dbContext.Loans
            .Include(l=>l.Tariff)
            .Where(l => (dto.UserIds.Count == 0 || dto.UserIds.Contains(l.UserId))
                        && (dto.AccountIds.Count == 0 || dto.AccountIds.Contains(l.Id))
                        && (dto.CurrencyTypes.Count == 0 || dto.CurrencyTypes.Contains(l.CurrencyType)))
            .ToPagedList(dto);
        return loans.Select(l =>
            new LoanDto {
                Id = l.Id,
                UserId = l.UserId,
                AccountId = l.AccountId,
                Tariff = new TariffDto {
                    Id = l.Tariff.Id,
                    Name = l.Tariff.Name,
                    PeriodInDays = l.Tariff.PeriodInDays,
                    InterestRate = l.Tariff.InterestRate,
                    CurrencyTypes = l.Tariff.CurrencyTypes
                },
                LastChargeDate = l.LastChargeDate,
                CurrencyType = l.CurrencyType,
                Debt = l.Debt
            }).ToList();
    }
}