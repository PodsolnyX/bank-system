using Microsoft.AspNetCore.SignalR;

namespace OperationHistory.BLL.Services;

/// <summary>
/// Provides the User ID for SignalR
/// </summary>
public class SignalRUserIdProvider {
    /// <summary>
    /// Returns the User ID for SignalR
    /// </summary>
    /// <param name="connection"></param>
    /// <returns></returns>
    public string GetUserId(HubConnectionContext connection) {
        return connection.User.Identity!.Name!;
    }
}