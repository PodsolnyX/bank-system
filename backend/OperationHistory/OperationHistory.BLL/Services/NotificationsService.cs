using System.Text.Json;
using Common.DataTransfer;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
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

    public async Task SendFirebase(OperationHistoryMessage messageDto) {
        FirebaseApp.Create(new AppOptions() {
            Credential = GoogleCredential.FromFile("../OperationHistory.BLL/test-27676-firebase-adminsdk-xyxen-11d662c6eb.json")
        });
        var messaging = FirebaseMessaging.DefaultInstance;
        var result = await messaging.SendEachAsync([new Message {
            Notification = new Notification {
                Title = messageDto.OperationType + " " + messageDto.DateTime,
                Body = messageDto.Amount + " " + messageDto.CurrencyType,
                ImageUrl = "https://ihealth.in.ua/wp-content/uploads/2021/09/shutterstock_923986961.jpg"
            },
            Token =
                "epGz-IrsDm9PdLzduCTbKJ:APA91bH_j_k82pi_QwLkYSR4fXjhrwrCsf6y6MaS10xfW4XxX1tHphHiE2jS7g2P8waisS3AjSE4VHNS1D6W1lDE4Bn8NdBaqW5RQ1MTwRgY69YkOnYISwIi51KLyWAhUaIWY1fKCZpb",

        },
        new Message {
            Notification = new Notification {
                Title = messageDto.OperationType + " " + messageDto.DateTime,
                Body = messageDto.Amount + " " + messageDto.CurrencyType,
                ImageUrl = "https://ihealth.in.ua/wp-content/uploads/2021/09/shutterstock_923986961.jpg"
            },
            Token =
                "elR57jFj0qu6kay6lhG9Ww:APA91bHxzJQfGLhqTEfYkeXQDGgK3yfB4WqKMam8oZN2BHeBeK6gcQeLuY2OOLr4NS8HbcVOiZWXGJ2ZDYFrU8rJiFAhwa7hcz2YrSWwCcjtW1OSdIE0D8-d36eyBREWvHi7qgOYsOEF",

        }]);
    }
}