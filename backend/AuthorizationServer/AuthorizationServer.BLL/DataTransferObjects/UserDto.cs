namespace Auth.BLL.DataTransferObjects;

public class UserDto {
    public Guid Id { get; set; }
    public string Mail { get; set; }
    public string? Name { get; set; }
    public bool IsEmployee { get; set; }
    public DateTimeOffset? BannedAt { get; set; }
}