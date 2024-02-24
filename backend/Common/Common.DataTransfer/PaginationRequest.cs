namespace Common.DataTransfer;

public class PaginationRequest {
    public int? Offset { get; set; }
    public int? Limit { get; set; }
    public string? OrderBy { get; set; }
    public SortOrder SortOrder { get; set; }
}

public enum SortOrder {
    Asc,
    Desc
}