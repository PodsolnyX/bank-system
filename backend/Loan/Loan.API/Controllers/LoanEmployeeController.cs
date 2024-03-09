using Common.Auth.ApiKeyAuthorization;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

[Controller]
[Route("loan/employee")]
[ApiKeyAuthorization]

public class LoanEmployeeController: ControllerBase {
    private readonly LoanService _loanService;
    private readonly PaymentService _paymentService;

    public LoanEmployeeController(LoanService loanService, PaymentService paymentService) {
        _loanService = loanService;
        _paymentService = paymentService;
    }

    /*/// <summary>
    /// Get specific loan
    /// </summary>
    [HttpGet("{id:guid}")]
    public Task<List<LoanDto>> GetLoan(Guid id) {
        throw new NotImplementedException();
    }*/
    
    /// <summary>
    /// Get all loans
    /// </summary>
    [HttpGet]
    public async Task<List<LoanDto>> GetLoans(SearchLoanEmployeeDto dto) {
        return await _loanService.GetLoans(dto);
    }
    /// <summary>
    /// Get user`s payments
    /// </summary>
    [HttpGet("{userId}")]
    public async Task<List<PaymentDto>> GetLoanPayments(SearchPaymentDto dto ,Guid userId) {
        return await _paymentService.GetPayments(dto, userId);
    }
}