using System.Net.Http.Json;
using Common.Enum;
using Common.Exception;
using Loan.BLL.DataTransferObjects;
using Loan.DAL;
using Microsoft.Extensions.Options;

namespace Loan.BLL.Services;

public  class LoanService {
    private readonly LoanDbContext _dbContext;
    private readonly IOptions<InternalApiQuery> _options;
    public  LoanService(LoanDbContext dbContext, IOptions<InternalApiQuery> options) {
        _dbContext = dbContext;
        _options = options;
    }
    public async Task RequestLoan(RequestLoanDto dto) {
        var request = new RequestLoanDto {
            UserId = default,
            AccountId = default,
            TariffId = default,
            Amount = 0,
            CurrencyType = CurrencyType.Rub
        };
        HttpClient httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri(_options.Value.BaseUrlArbiter);
        var response = await httpClient.PostAsJsonAsync($"{_options.Value.BaseArbiterController}/loan", request);
        if (!response.IsSuccessStatusCode)
            throw new BadRequestException();
    }
    
    public async Task ChargeLoan(LoanChargeDto dto) {
        var request = new RequestLoanChargeDto {
            Amount = dto.Amount,
            CurrencyType = dto.CurrencyType
        };
        HttpClient httpClient = new HttpClient();
        httpClient.BaseAddress = new Uri(_options.Value.BaseUrlArbiter);
        var response = await httpClient.PostAsJsonAsync($"{_options.Value.BaseArbiterController}/loan-charge", request);
        if (!response.IsSuccessStatusCode)
            throw new BadRequestException();
    }
    

    /*public async Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }*/
    

    public async Task<List<LoanDto>> GetLoans(SearchLoanUserDto dto, Guid userId) {
        throw new NotImplementedException();
    }
    public async Task<List<LoanDto>> GetLoans(SearchLoanEmployeeDto dto) {
        throw new NotImplementedException();
    }
}