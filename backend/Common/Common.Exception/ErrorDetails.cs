using System.Text.Json;

namespace Common.Exception;

/// <summary>
/// Error details model
/// </summary>
public class ErrorDetails {
    /// <summary>
    /// Http status code
    /// </summary>
    public int StatusCode { get; set; }

    /// <summary>
    /// Message to user
    /// </summary>
    public string? Message { get; set; }

    /// <summary>
    /// Trace id
    /// </summary>
    public string? TraceId { get; set; }

    /// <summary>
    /// Convert to string
    /// </summary>
    /// <returns></returns>
    public override string ToString() {
        return JsonSerializer.Serialize(this);
    }
}