namespace Common.Persistence;

public abstract class BaseEntity {
    public DateTime CreatedAt { get; } = DateTime.UtcNow;
    
    public DateTime? ModifiedAt { get; set; }
    
    public DateTime? DeletedAt { get; set; }
}