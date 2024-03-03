namespace Common.Exception;

/// <summary>
/// Exception for forbidden status 
/// </summary>
[Serializable]
public class ForbiddenException : System.Exception {
    /// <summary>
    /// Constructor
    /// </summary>
    public ForbiddenException() {
    }

    /// <summary>
    /// Constructor
    /// </summary>
    public ForbiddenException(string message)
        : base(message) {
    }

    /// <summary>
    /// Constructor
    /// </summary>
    public ForbiddenException(string message, System.Exception inner)
        : base(message, inner) {
    }
}