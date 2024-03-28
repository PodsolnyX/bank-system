using System.Text.Json;
using Common.DataTransfer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace OperationHistory.BLL.Hubs;

/// <summary>
/// hub
/// </summary>
public class NotificationHub: Hub {
    private readonly ILogger<NotificationHub> _logger;

    /// <summary>
    /// constructor
    /// </summary>s
    /// <param name="logger"></param>
    public NotificationHub(ILogger<NotificationHub> logger) {
        _logger = logger;
    }
    /// <summary>
    /// on connected
    /// </summary>
    public override async Task OnConnectedAsync() {
        if (Context.UserIdentifier == null) {
            _logger.LogError("User identifier is null");
            return;
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, Context.UserIdentifier);
        await base.OnConnectedAsync();
    }
    /// <summary>
    /// on disconnected
    /// </summary>
    /// <param name="exception"></param>
    public override async Task OnDisconnectedAsync(Exception? exception) {
        if (Context.UserIdentifier == null) {
            _logger.LogError("User identifier is null");
            return;
        }
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, Context.UserIdentifier);
        await base.OnDisconnectedAsync(exception);
    }
    
   
}