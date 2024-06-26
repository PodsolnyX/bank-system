﻿using Common.DataTransfer;
using Common.Enum;
using Common.Exception;
using Core.BLL.DataTransferObjects;
using Core.DAL;
using Core.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Core.BLL.Services;

public class AccountInternalService
{
    private readonly CoreDbContext _dbContext;
    private readonly OperationHistorySender _operationHistorySender;
    private readonly AccountBalanceService _accountBalanceService;
    private readonly CurrencyTransferService _transferService;
    private readonly ILogger<AccountInternalService> _logger;

    public AccountInternalService(
        CoreDbContext dbContext,
        OperationHistorySender operationHistorySender,
        AccountBalanceService accountBalanceService,
        CurrencyTransferService transferService,
        ILogger<AccountInternalService> logger
    )
    {
        _dbContext = dbContext;
        _operationHistorySender = operationHistorySender;
        _accountBalanceService = accountBalanceService;
        _transferService = transferService;
        _logger = logger;
    }

    public async Task ModifyAccount(Guid accountId, AccountModificationDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        if (dto.Type == OperationType.Withdraw && account!.Amount < dto.Amount)
        {
            _logger.LogError("Not enough money on the account");
            throw new InvalidOperationException("Not enough money on the account");
        }

        await _accountBalanceService.LockAccount(accountId);

        try
        {
            _operationHistorySender.SendOperationHistoryMessage(
                new OperationHistoryMessage
                {
                    UserId = account!.UserId,
                    AccountId = accountId,
                    LoanId = dto.LoanId,
                    TransactionId = dto.TransactionId ?? Guid.NewGuid(),

                    OperationType = dto.Type,
                    OperationReason = dto.Reason,
                    OperationStatus = OperationStatus.Success,

                    Amount = dto.Amount,
                    CurrencyType = account.CurrencyType,

                    DateTime = DateTime.UtcNow,
                    Message = dto.Message
                }
            );
        }
        catch (Exception e)
        {
            await _accountBalanceService.UnlockAccount(accountId);
        }
    }

    public async Task ModifyAccountCancel(Guid accountId, AccountModificationDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);

        if (dto.Type == OperationType.Deposit && account!.Amount < dto.Amount)
        {
            _logger.LogError("Not enough money on the account");
            throw new InvalidOperationException("Not enough money on the account");
        }

        await _accountBalanceService.LockAccount(accountId);

        try
        {
            _operationHistorySender.SendOperationHistoryMessage(
                new OperationHistoryMessage
                {
                    UserId = account!.UserId,
                    AccountId = accountId,
                    LoanId = dto.LoanId,
                    TransactionId = dto.TransactionId ?? Guid.NewGuid(),

                    OperationType = dto.Type,
                    OperationReason = dto.Reason,
                    OperationStatus = OperationStatus.Failure,

                    Amount = dto.Amount,
                    CurrencyType = account.CurrencyType,

                    DateTime = DateTime.UtcNow,
                    Message = dto.Message
                }
            );
        }
        catch (Exception e)
        {
            await _accountBalanceService.UnlockAccount(accountId);
        }
    }

    public async Task TransferMoneyInternal(
        Guid fromAccountId,
        Guid toAccountId,
        long amount,
        Guid? userId = null
    )
    {
        if (amount < 100)
            throw new BadRequestException("Minimum amount is 100");
        var fromAccount = await _dbContext.Accounts.FindAsync(fromAccountId);
        if (fromAccount!.Amount < amount)
            throw new InvalidOperationException("Not enough money");
        if (fromAccount.IsLockedForTransaction)
            throw new InvalidOperationException("Account is locked");
        var toAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == toAccountId);
        if (toAccount == null)
            throw new NotFoundException("Account to transfer not found");
        await TransferMoney(amount, fromAccount, toAccount);
    }

    private async Task TransferMoney(long amount, Account fromAccount, Account toAccount)
    {
        var transferredAmount = await _transferService.TransferCurrency(
            fromAccount!.CurrencyType,
            toAccount.CurrencyType,
            amount
        );
        var fromAccountModification = new AccountModificationDto
        {
            Type = OperationType.Withdraw,
            Reason = OperationReason.Loan,
            TransactionId = Guid.NewGuid(),
            Amount = amount,
            Message = "Списание"
        };
        await ModifyAccount(fromAccount.Id, fromAccountModification);
        var toAccountModification = new AccountModificationDto
        {
            Type = OperationType.Deposit,
            Reason = OperationReason.Loan,
            TransactionId = fromAccountModification.TransactionId,
            Amount = transferredAmount,
            Message = "Пополнение"
        };
        try
        {
            await ModifyAccount(toAccount.Id, toAccountModification);
            _logger.LogInformation("Transfer success");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Transfer failed");
            var cancelWithdraw = new AccountModificationDto
            {
                Type = OperationType.Deposit,
                Reason = OperationReason.Loan,
                TransactionId = fromAccountModification.TransactionId,
                Amount = amount,
                Message = "Отмена"
            };
            await ModifyAccountCancel(fromAccount.Id, cancelWithdraw);
            _logger.LogInformation("Transfer canceled");
        }
    }
}
