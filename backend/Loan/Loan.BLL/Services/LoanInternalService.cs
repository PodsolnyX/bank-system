using Common.Enum;
using Common.Exception;
using Loan.BLL.DataTransferObjects;
using Loan.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loan.BLL.Services;

public class LoanInternalService {
    private readonly LoanDbContext _dbContext;

    public LoanInternalService(LoanDbContext dbContext) {
        _dbContext = dbContext;
    }
    
    public async Task<Guid> TakeLoan(TakeLoanDto dto) {
        var tariff = await _dbContext.Tariffs.FirstOrDefaultAsync(t => t.Id == dto.TariffId);
        if (tariff == null)
            throw new NotFoundException("Tariff not found");
        var loan = new DAL.Entities.Loan {
            UserId = dto.UserId,
            AccountId = dto.AccountId,
            Tariff = tariff,
            CurrencyType = dto.CurrencyType,
            Debt = dto.Amount
        };
        _dbContext.Add(loan);
        await _dbContext.SaveChangesAsync();
        return loan.Id;
    }
    
    public async Task TakeLoanCancel(Guid loanId) {
        var loan = await _dbContext.Loans.FirstOrDefaultAsync(t => t.Id == loanId);
        if (loan == null)
            throw new NotFoundException("Loan not found");
        _dbContext.Remove(loan);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task ChargeLoan(LoanChargeDto dto, Guid loanId) {
        var loan = await _dbContext.Loans.FirstOrDefaultAsync(t => t.Id == loanId);
        if (loan == null)
            throw new NotFoundException("Loan not found");
        if (loan.CurrencyType != dto.CurrencyType)
            throw new BadRequestException("Another CurrencyType");
        if (loan.Debt < dto.Amount)
            throw new BadRequestException("Too many money");
        loan.Debt -= dto.Amount;
        _dbContext.Update(loan);
        await _dbContext.SaveChangesAsync();
    }
}