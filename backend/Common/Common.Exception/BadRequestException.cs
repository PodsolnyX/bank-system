namespace Common.Exception;

/// <summary>
/// Exception for bad request HTTP status code
/// </summary>
[Serializable]
public class BadRequestException : System.Exception {
    /// <summary>
    /// Constructor
    /// </summary>
    public BadRequestException() {
    }

    /// <summary>
    /// Constructor
    /// </summary>
    public BadRequestException(string message)
        : base(message) {
    }

    /// <summary>
    /// Constructor
    /// </summary>
    public BadRequestException(string message, System.Exception inner)
        : base(message, inner) {
    }
}