using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class LoanChargeDto
{
    [Required]
    public long Amount { get; set; }

    [Required]
    public Guid LoanId { get; set; }

    [Required]
    public Guid AccountId { get; set; }
    public Guid UserId { get; set; }

    [Required]
    public CurrencyType CurrencyType { get; set; }
}
