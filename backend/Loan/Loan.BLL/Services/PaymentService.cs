using Common.Enum;
using Loan.BLL.DataTransferObjects;
using Loan.DAL;
using Loan.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loan.BLL.Services;

public class PaymentService {
    private readonly LoanDbContext _dbContext;

    public PaymentService(LoanDbContext dbContext) {
        _dbContext = dbContext;
    }
    public async Task<List<PaymentDto>> GetPayments(SearchPaymentDto dto, Guid userId) {
        var payments = await _dbContext.Payments
            .Include(p => p.Loan)
            .ThenInclude(l => l.Tariff)
            .Where(p => p.Loan.UserId == userId
                        && (dto.LoanIds.Count == 0 || dto.LoanIds.Contains(p.Loan.Id))
                        && (!dto.OnlyActual || p.IsActual))
            .ToListAsync();
        
        return payments
            .OrderBy(p=> dto.LoanIds.IndexOf(p.Id))         
            .Select(p => new PaymentDto {
            Id = p.Id,
            Loan = new LoanDto {
                Id = p.Loan.Id,
                UserId = p.Loan.UserId,
                AccountId = p.Loan.AccountId,
                Tariff = new TariffDto {
                    Id =  p.Loan.Tariff.Id,
                    Name = p.Loan.Tariff.Name,
                    PeriodInDays = p.Loan.Tariff.PeriodInDays,
                    InterestRate = p.Loan.Tariff.InterestRate,
                    CurrencyTypes = p.Loan.Tariff.CurrencyTypes
                },
                LastChargeDate = p.Loan.LastChargeDate,
                CurrencyType = p.Loan.CurrencyType,
                Debt = p.Loan.Debt,
            },
            PenaltyFee = p.PenaltyFee,
            IsActual = p.IsActual,
            AmountForPay = p.AmountForPay,
            AlreadyPaid = p.AlreadyPaid,
            PaidAt = p.PaidAt
        }).ToList();
    }
    
    public async Task ExecutePayment() {
        var payments = await _dbContext.Payments
            .Include(p=>p.Loan)
            .Where(p=>p.IsActual)
            .ToListAsync();
        foreach (var payment in payments) {
            if (payment.IsActual && payment.AmountForPay > payment.AlreadyPaid) {
                payment.Loan.Debt += 1000;
                payment.PenaltyFee += 1000;
            }
            payment.IsActual = false;
        }
        
        // вычисляем следующий платеж
        var loans = await _dbContext.Loans
            .Include(l=>l.Tariff)
            .Where(l => l.Debt > 0)
            .ToListAsync();
        foreach (var loan in loans) {
            var loanEnd = loan.CreatedAt.AddDays(loan.Tariff.PeriodInDays);
            var leftDays = (int)Math.Ceiling((loanEnd - DateTime.UtcNow).TotalDays);
            loan.Debt *= (int)(1 + loan.Tariff.InterestRate / 100);
            var payment = new PaymentRequest {
                Loan = loan,
                CurrentDebt = loan.Debt,
                AmountForPay = (int)Math.Ceiling(loan.Debt / (double)leftDays),
                AlreadyPaid = 0,
                IsActual = true,
                PenaltyFee = 0,
            };
            _dbContext.Add(payment);
        }

        await _dbContext.SaveChangesAsync();
    }
}