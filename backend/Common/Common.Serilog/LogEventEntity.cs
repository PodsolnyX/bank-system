namespace Common.Serilog;

public class LogEventEntity
{
    public string MicroserviceName { get; set; } = null!;

    public string Level { get; set; } = null!;
    public string TraceId { get; set; } = null!;
    public DateTimeOffset Timestamp { get; set; }

    public string? Exception { get; set; }
    public string? MessageTemplate { get; set; }
    public string? Message { get; set; }
}
