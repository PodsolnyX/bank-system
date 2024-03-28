using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace OperationHistory.BLL.Services;

/// <summary>
/// Provides the User ID for SignalR
/// </summary>
public class SignalRUserIdProvider : IUserIdProvider {
    /// <summary>
    /// Returns the User ID for SignalR
    /// </summary>
    /// <param name="connection"></param>
    /// <returns></returns>
    public string GetUserId(HubConnectionContext connection) {
        return connection.User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            .Select(c => Guid.Parse(c.Value))
            .FirstOrDefault()
            .ToString();
    }
}