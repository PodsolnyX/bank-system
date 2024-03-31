using System.Text.Json;
using Common.DataTransfer;
using Microsoft.AspNetCore.SignalR;
using OperationHistory.BLL.Hubs;

namespace OperationHistory.BLL.Services;

public class NotificationsService {
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationsService( IHubContext<NotificationHub> hubContext) {
        _hubContext = hubContext;
    }

    public async Task SendNotification(OperationHistoryMessage messageDto) {
        await _hubContext.Clients.Group(messageDto.UserId.ToString())
            .SendAsync("ReceiveMessage", JsonSerializer.Serialize(messageDto));
    }
}