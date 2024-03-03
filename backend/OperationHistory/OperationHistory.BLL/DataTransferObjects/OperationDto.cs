﻿using System.Buffers;
using Common.Enum;
using OperationStatus = Common.Enum.OperationStatus;

namespace OperationHistory.BLL.DataTransferObjects;

public class OperationDto
{
    public Guid Id { get; set; }
    public Guid AccountId { get; set; }
    public Guid? LoanId { get; set; }
    public OperationType Type { get; set; }
    public OperationStatus Status { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public int Amount { get; set; }
    public string? Message { get; set; }
}
