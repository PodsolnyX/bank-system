namespace Common.DataTransfer;

public class UpdateAccountBalanceMessage
{
    public Guid AccountId { get; set; }
    public long Amount { get; set; }
    public DateTime DateTime { get; set; }
}
