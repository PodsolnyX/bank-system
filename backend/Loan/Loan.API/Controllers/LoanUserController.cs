using Common.Auth.ApiKeyAuthorization;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/user")]
[ApiKeyAuthorization]
public class LoanUserController: ControllerBase {
    private readonly LoanService _loanService;
    private readonly PaymentService _paymentService;

    public LoanUserController(LoanService loanService, PaymentService paymentService) {
        _loanService = loanService;
        _paymentService = paymentService;
    }

    /// <summary>
    /// Request a loan
    /// </summary>
    [HttpPost("request")]
    public async Task RequestLoan(RequestLoanDto dto) {
        var userId = HttpContext.GetUserId();
        dto.UserId = userId;
        await _loanService.RequestLoan(dto);
    }
    
    /// <summary>
    /// Charge a loan
    /// </summary>
    [HttpPost("charge")]
    public async Task ChargeLoan(LoanChargeDto dto) {
        var userId = HttpContext.GetUserId();
        dto.UserId = userId;
        await _loanService.ChargeLoan(dto);
    }
    
    /*/// <summary>
    /// Get user`s loan
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }*/
    
    /// <summary>
    /// Get user`s loans
    /// </summary>
    [HttpGet]
    public async Task<List<LoanDto>> GetLoans(SearchLoanUserDto dto) {
        var userId = HttpContext.GetUserId();
        return await _loanService.GetLoansUser(dto, userId);
    }
    /// <summary>
    /// Get user`s payments
    /// </summary>
    [HttpGet("payments")]
    public async Task<List<PaymentDto>> GetLoanPayments( SearchPaymentDto dto) {
        var userId = HttpContext.GetUserId();
        return await _paymentService.GetPayments(dto, userId);
    }
    /// <summary>
    /// Execute job
    /// </summary>
    [HttpPost]
    public async Task ExecuteJob() {
         await _paymentService.ExecutePayment();
    }
}