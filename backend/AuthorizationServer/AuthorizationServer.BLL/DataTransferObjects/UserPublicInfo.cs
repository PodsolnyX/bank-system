namespace AuthorizationServer.BLL.DataTransferObjects;

public class UserPublicInfo
{
    public bool IsEmployee { get; set; }
    public DateTimeOffset? BannedAt { get; set; }
}
