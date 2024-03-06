﻿using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Loan.BLL.DataTransferObjects;

public class LoanChargeDto {
    [Required]
    public int Amount { get; set; }
    
    [Required]
    public CurrencyType CurrencyType { get; set; }
}