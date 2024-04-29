namespace Arbiter.DAL.Entities;

public class CircuitBreaker {
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime? CoreTimeout { get; set; }
    public DateTime? LoanTimeout { get; set; }
}