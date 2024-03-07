using Common.Enum;
using Loan.BLL.DataTransferObjects;
using Loan.DAL;
using Microsoft.AspNetCore.Mvc;

namespace Loan.BLL.Services;

public class LoanInternalService {
    private readonly LoanDbContext _dbContext;

    public LoanInternalService(LoanDbContext dbContext) {
        _dbContext = dbContext;
    }
    
    public Task TakeLoan(TakeLoanDto dto) {
        /*var loan = new DAL.Entities.Loan {
            UserId = dto.UserId,
            AccountId = dto.AccountId,
            TariffId = dto.TariffId,
            LastChargeDate = default,
            CurrencyType = dto.CurrencyType,
            Debt = 
        }*/
        throw new NotImplementedException();
    }
    
    public Task TakeLoanCancel(Guid loanId) {
        throw new NotImplementedException();
    }
    
    public Task ChargeLoanCancel(LoanChargeDto dto) {
        throw new NotImplementedException();
    }
}