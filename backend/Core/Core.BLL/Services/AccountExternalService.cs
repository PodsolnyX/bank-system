﻿using Common.DataTransfer;
using Common.Enum;
using Common.Exception;
using Core.BLL.DataTransferObjects;
using Core.DAL;
using Core.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Core.BLL.Services;

public class AccountExternalService
{
    private readonly CoreDbContext _dbContext;
    private readonly OperationHistorySender _operationHistorySender;
    private readonly AccountBalanceService _accountBalanceService;
    private readonly ILogger<AccountExternalService> _logger;
    private readonly CurrencyTransferService _transferService;
    private readonly AccountInternalService _internalService;

    public AccountExternalService(
        CoreDbContext dbContext,
        OperationHistorySender operationHistorySender,
        AccountBalanceService accountBalanceService,
        ILogger<AccountExternalService> logger,
        CurrencyTransferService transferService,
        AccountInternalService internalService
    )
    {
        _dbContext = dbContext;
        _operationHistorySender = operationHistorySender;
        _accountBalanceService = accountBalanceService;
        _logger = logger;
        _transferService = transferService;
        _internalService = internalService;
    }

    public async Task<AccountDto> OpenAccount(Guid userId, OpenAccountDto dto)
    {
        var account = new Account
        {
            UserId = userId,
            CurrencyType = dto.CurrencyType,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Accounts.Add(account);
        await _dbContext.SaveChangesAsync();
        _logger.LogInformation("Account {AccountId} opened", account.Id);

        return await GetAccount(userId, account.Id);
    }

    public async Task CloseAccount(Guid userId, Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account, userId);

        account!.DeletedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Account {AccountId} closed", account.Id);
    }

    public async Task<AccountDto> GetAccount(Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account);

        _logger.LogInformation("Account {AccountId} retrieved", account!.Id);

        return account!.ToDto();
    }

    public async Task<AccountDto> GetAccount(Guid userId, Guid accountId)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account, userId);

        _logger.LogInformation("Account {AccountId} retrieved", account!.Id);

        return account!.ToDto();
    }

    public async Task<List<AccountDto>> GetAccounts(Guid userId, SearchAccountUserDto searchDto)
    {
        var accounts = await _dbContext
            .Accounts.Where(e =>
                e.UserId == userId
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return accounts.Select(account => account.ToDto()).ToList();
    }

    public async Task<List<AccountDto>> GetAccounts(SearchAccountEmployeeDto searchDto)
    {
        var accounts = await _dbContext
            .Accounts.Where(e =>
                (searchDto.UserIds.Count == 0 || searchDto.UserIds.Contains(e.UserId))
                && (
                    searchDto.CurrencyTypes.Count == 0
                    || searchDto.CurrencyTypes.Contains(e.CurrencyType)
                )
            )
            .ToPagedList(searchDto);

        return accounts.Select(account => account.ToDto()).ToList();
    }

    public async Task ModifyAccount(Guid userId, Guid accountId, AccountModificationDto dto)
    {
        var account = await _dbContext.Accounts.FindAsync(accountId);
        CheckAccount(account, userId);

        if (dto.Type == OperationType.Withdraw && account!.Amount < dto.Amount)
        {
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

    private void CheckAccount(Account? account, Guid? userId = null)
    {
        if (account == null)
        {
            throw new InvalidOperationException("Account not found");
        }

        if (userId != null && account.UserId != userId)
        {
            throw new InvalidOperationException("Not enough rights to access the account");
        }
    }

    public async Task MakeAccountPriority(Guid accountId, Guid userId)
    {
        var accounts = await _dbContext
            .Accounts.Where(a => a.UserId == userId && (a.IsPriority || a.Id == accountId))
            .ToListAsync();

        if (accounts.All(a => a.Id != accountId))
            throw new NotFoundException("Account not found");

        foreach (var account in accounts)
        {
            if (account.IsPriority)
                account.IsPriority = false;
            if (account.Id == accountId)
                account.IsPriority = true;
        }
        _dbContext.UpdateRange(accounts);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Account {AccountId} set as priority", accountId);
    }

    public async Task TransferMoneyToUser(
        Guid fromAccountId,
        Guid toUserId,
        long amount,
        Guid? userId = null
    )
    {
        if (amount < 100)
            throw new BadRequestException("Minimum amount is 100");
        var fromAccount = await _dbContext.Accounts.FindAsync(fromAccountId);
        CheckAccount(fromAccount, userId);
        if (fromAccount!.Amount < amount)
            throw new InvalidOperationException("Not enough money");
        if (fromAccount.IsLockedForTransaction)
            throw new InvalidOperationException("Account is locked");
        var toAccount = await _dbContext.Accounts.FirstOrDefaultAsync(a =>
            a.IsPriority && a.UserId == toUserId
        );
        if (toAccount == null)
            throw new NotFoundException(
                "Account to transfer not found, may be choose priority account"
            );
        await TransferMoney(amount, fromAccount, toAccount);

        _logger.LogInformation(
            "Money transferred from {FromAccountId} account to {ToUserId} user",
            fromAccountId,
            toUserId
        );
    }

    public async Task TransferMoneyBetweenMyAccounts(
        Guid fromAccountId,
        Guid toAccountId,
        long amount,
        Guid? userId = null
    )
    {
        if (amount < 100)
            throw new BadRequestException("Minimum amount is 100");

        var fromAccount = await _dbContext.Accounts.FindAsync(fromAccountId);
        CheckAccount(fromAccount, userId);
        if (fromAccount!.Amount < amount)
            throw new InvalidOperationException("Not enough money");
        if (fromAccount.IsLockedForTransaction)
            throw new InvalidOperationException("Account is locked");
        var toAccount = await _dbContext.Accounts.FindAsync(toAccountId);
        if (toAccount == null)
            throw new NotFoundException("Account to transfer not found");
        await TransferMoney(amount, fromAccount, toAccount);

        _logger.LogInformation(
            "Money transferred from {FromAccountId} account to {ToAccountId} account",
            fromAccountId,
            toAccountId
        );
    }

    private async Task TransferMoney(long amount, Account fromAccount, Account toAccount)
    {
        if (
            fromAccount.Id == new Guid("F6AB14AA-4634-4644-A6A9-2F84D8A878DB")
            || toAccount.Id == new Guid("F6AB14AA-4634-4644-A6A9-2F84D8A878DB")
        )
            throw new BadRequestException("Master-account is not available in this operations");

        var transferredAmount = await _transferService.TransferCurrency(
            fromAccount!.CurrencyType,
            toAccount.CurrencyType,
            amount
        );
        var fromAccountModification = new AccountModificationDto
        {
            Type = OperationType.Withdraw,
            Reason = OperationReason.Cash,
            TransactionId = Guid.NewGuid(),
            Amount = amount,
            Message = "Перевод"
        };
        await _internalService.ModifyAccount(fromAccount.Id, fromAccountModification);
        var toAccountModification = new AccountModificationDto
        {
            Type = OperationType.Deposit,
            Reason = OperationReason.Cash,
            TransactionId = fromAccountModification.TransactionId,
            Amount = transferredAmount,
            Message = "Перевод"
        };
        try
        {
            await _internalService.ModifyAccount(toAccount.Id, toAccountModification);
        }
        catch (Exception e)
        {
            var cancelWithdraw = new AccountModificationDto
            {
                Type = OperationType.Deposit,
                Reason = OperationReason.Cash,
                TransactionId = fromAccountModification.TransactionId,
                Amount = amount,
                Message = "Отмена перевода"
            };
            await _internalService.ModifyAccountCancel(fromAccount.Id, cancelWithdraw);
        }
    }
}
