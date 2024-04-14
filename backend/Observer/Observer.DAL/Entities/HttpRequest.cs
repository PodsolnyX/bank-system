using System.ComponentModel.DataAnnotations;

namespace Observer.DAL.Entities;

public class HttpRequest : BaseEntity
{
    public DateTime StartedAt { get; set; }
    public DateTime FinishedAt { get; set; }
    public long DurationInMilliseconds { get; set; }

    public string Method { get; set; }
    public string Path { get; set; }
    public string? QueryString { get; set; }
    public string Body { get; set; }
    public Dictionary<string, string> Headers { get; set; }

    [MaxLength(256)]
    public string? RemoteIpAddress { get; set; }

    [MaxLength(256)]
    public string? UserAgent { get; set; }

    public int StatusCode { get; set; }

    public string? ResponseBody { get; set; }
    public Dictionary<string, string>? ResponseHeaders { get; set; }
}
