namespace Observer.DAL.Entities;

public class Log : BaseEntity
{
    public string Level { get; set; } = null!;
    public string? Exception { get; set; }
    public string? MessageTemplate { get; set; }
    public string? Message { get; set; }
}
