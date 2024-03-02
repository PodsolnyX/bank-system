namespace Auth.DAL.Entities;

public class User {
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Mail { get; set; }
    public string Name { get; set; }
    public bool IsEmployee { get; set; }
    public DateTime? BannedAt { get; set; }
}