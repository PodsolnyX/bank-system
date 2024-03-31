using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class TakeLoanDto
{
    [Required]
    public Guid UserId { get; set; }

    [Required]
    public Guid AccountId { get; set; }

    [Required]
    public Guid TariffId { get; set; }

    [Required]
    public long Amount { get; set; }

    [Required]
    public CurrencyType CurrencyType { get; set; }
}
