namespace Observer.DAL.Entities;

public class BaseEntity
{
    public Guid Id { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public string TraceId { get; set; }
    public string MicroserviceName { get; set; }
    public List<string> Tags { get; set; }
    public string Source { get; set; }
}
