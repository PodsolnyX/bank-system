namespace Common.Persistence;

public abstract class BaseEntity {
    public DateTime CreatedAt { get; set; }
    
    public DateTime? ModifiedAt { get; set; }
    
    public DateTime? DeletedAt { get; set; }
}