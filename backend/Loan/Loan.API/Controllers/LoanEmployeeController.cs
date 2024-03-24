using Common.Auth.ApiKeyAuthorization;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Loan.API.Controllers;

/// <summary>
/// 
/// </summary>
[Controller]
[Route("loan/employee")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Employee")]

public class LoanEmployeeController: ControllerBase {
    private readonly LoanService _loanService;
    private readonly PaymentService _paymentService;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="loanService"></param>
    /// <param name="paymentService"></param>
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
    /// Get user`s credit rating (0 - 1000)
    /// </summary>
    [HttpGet("rating/{userId}")]
    public async Task<int> GetCreditRating(Guid userId) {
        return await _loanService.GetCreditRating(userId);
    }
    
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