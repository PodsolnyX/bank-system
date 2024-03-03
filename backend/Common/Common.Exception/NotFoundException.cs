namespace Common.Exception;

/// <summary>
/// Exception for not found HTTP status code
/// </summary>
[Serializable]
public class NotFoundException : System.Exception {
    /// <summary>
    /// Constructor
    /// </summary>
    public NotFoundException() {
    }

    /// <summary>
    /// Constructor
    /// </summary>
    public NotFoundException(string message)
        : base(message) {
    }

    /// <summary>
    /// Constructor
    /// </summary>
    public NotFoundException(string message, System.Exception inner)
        : base(message, inner) {
    }
}
