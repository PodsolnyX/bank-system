using Common.Enum;
using Core.DAL.Entities;

namespace Core.BLL.DataTransferObjects;

public class AccountDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public CurrencyType CurrencyType { get; set; }
    public int Amount { get; set; }
    public DateTime? ClosedAt { get; set; }
    public bool IsPriority { get; set; } = false;

}

public static class AccountDtoExtensions
{
    public static AccountDto ToDto(this Account account)
    {
        return new AccountDto
        {
            Id = account.Id,
            UserId = account.UserId,
            CurrencyType = account.CurrencyType,
            Amount = account.Amount,
            ClosedAt = account.DeletedAt,
            IsPriority = account.IsPriority
        };
    }
}
