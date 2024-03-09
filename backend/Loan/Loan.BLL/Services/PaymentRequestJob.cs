using Loan.DAL;
using Loan.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loan.BLL.Services;

public class PaymentRequestJob {
    private readonly LoanDbContext _dbContext;
    private readonly PaymentService _paymentService;

    public PaymentRequestJob(LoanDbContext dbContext, PaymentService paymentService) {
        _dbContext = dbContext;
        _paymentService = paymentService;
    }

    public async Task ExecutePayment() {
        await _paymentService.ExecutePayment();
    }
}