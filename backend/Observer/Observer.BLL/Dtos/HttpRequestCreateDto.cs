﻿namespace Observer.BLL.Dtos;

public class HttpRequestCreateDto
{
    public string MicroserviceName { get; set; }
    public List<string> Tags { get; set; }
    public string Source { get; set; }
    public string TraceId { get; set; }
    public string? IdempotencyKey { get; set; }

    public DateTime StartedAt { get; set; }
    public DateTime FinishedAt { get; set; }
    public long DurationInMilliseconds { get; set; }

    public string Method { get; set; }
    public string Path { get; set; }
    public string? QueryString { get; set; }
    public Dictionary<string, string> Headers { get; set; }

    public string? RemoteIpAddress { get; set; }
    public string? UserAgent { get; set; }

    public int StatusCode { get; set; }
    public Dictionary<string, string>? ResponseHeaders { get; set; }
}
