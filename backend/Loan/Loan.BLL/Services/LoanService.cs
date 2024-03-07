using Loan.BLL.DataTransferObjects;
using Loan.DAL;

namespace Loan.BLL.Services;

public  class LoanService {
    private readonly LoanDbContext _dbContext;

    public  LoanService(LoanDbContext dbContext) {
        _dbContext = dbContext;
    }
    public async Task RequestLoan(RequestLoanDto dto) {
        throw new NotImplementedException();
    }
    
    public async Task ChargeLoan(LoanChargeDto dto) {
        throw new NotImplementedException();
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