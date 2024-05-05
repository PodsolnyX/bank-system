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
        if (FirebaseApp.DefaultInstance == null)
            FirebaseApp.Create(new AppOptions() {
            Credential = GoogleCredential.FromJson("{\n  \"type\": \"service_account\",\n  \"project_id\": \"test-27676\"," +
                                                   "\n  \"private_key_id\": \"11d662c6ebe00b063cf62082765feab3be5ba5c9\"," +
                                                   "\n  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXcA8f3zw2/qUr\\nxMohkBaDktx1xauRE3LnErPyCcCbpaanR0htE4iKtAKMfS1BtB+BLbwxQ4z1ZEC4\\nIPlLkrMdC2UdD8lRaJL1SFH/jtFEpUoQw13MY2tQ7LdaX0NPVPz51eOkDV03dFJb\\n1V9ww3nuw4puJJgwN3iHfh7GRHZ0wUqNC49pyUDN+qcM3gbvQqBce3AL4w2KA4NP\\nJtWa7TK+25WZsyae/IPFNBz+Td0vPwFqGDvbTtrA1rxRQweUB0OJxd/TCKdAAB7v\\nBJxfJCowaKkywSGKSwe1aNRUudPsnEkjk1DEUH5VL33WstuEwW3wvwniBNlbCyuC\\nIpokvpAxAgMBAAECggEALPVjQBqVtVv/LFHVkoZE8NXqZnqDV2Q3Qhu+2XYEvRC+\\nO75BZcSdTlRnx06oX2+6xK6Pxu5fjECxqBh9+m44h8Boyep0YZtSucg5M84yGZea\\nuARQNgw0AYftXUKX6Jb6La/Oz9b53CtIAiSEG6Wk7voVgGKT3gix20PZnhIYOsvs\\nzLlS/4rc2OI8bHr3BMV/uWJ2kR4OBLzzonW9H26ZbbyDVqNTnwBASf42O+EZq3xG\\ne7OPV3BTR99e1pZELCLJ4eoJRDfC80bPA5rbnfY6Q8zDY674WF4QLLynbKoAiPxv\\nVWJI4uWfAZL2rc/zWypjarpDzk3uY7ZlAaEkBEBL+wKBgQDGbZZ4oPi0JMLybAMP\\nHalTLGQMkAKGlJh6Ju2YJIYVEMQKh93NPpempwfG8uzngvS0AbLsDAYTQQkIWbq6\\nBFNKsADa+uoeJEa1PbULsHbjUKW2F4YgI4u/yFh4uNr8mqu6dGo3lnLkeOqJgQQ/\\n/ggwkGHNwWJNvSoTvfU5qUQccwKBgQDDYDlMUwRRvqt+nswy3eNES31Qc09U7gYh\\n1CYCXPQCRmeUZXlLor/OEakMCd/YCoMhWZsokupMbxrG9d3bSFz+aeRYPXOrWa+2\\nQEGVFE7Q1lcgpuZZcNIMtow9nl1jSlJkiv7VLbN4x550k+i1hilDGTL8Su1CDQmC\\njX/EgDy7ywKBgQCmYrosCH7DP5gggyXFhQ+46J40UoVrqCp7My1DyEyOWXKpiegY\\n9IVhfunsj0LLlmnujwYjHKnzdzNFx0fmNz5IgHEXLhMmlzCbRVUMqjnmvndVyz/y\\nrxu+Axb8k7U8381kGb3/Qq6wmhvAlWik6DSh1E/Oonv1x8sCpuR8J00vtQKBgBsK\\nw4OD7hIecQA6nIrh2WYHiNXM0AsyUtj10zj6gq+Z7RZGIU7NvPyZxysqZrgxZEsG\\nawpno1RnAG7PcyC52F1CbN+lyc/Kvx5bsHgg8nPHZxHW6AUzL2+hCLIyrDxk+hh+\\ngJ0jETdDcfQy0L/nTOjDoSH4gPRmd42BZlDdawqXAoGBAMK1K7ElkGYzXqOViNVH\\n8pkouTlb9XcQ/ZMIyQGbHqV/280UOgRmTrUa1IGIboM3Nguy5hFXewFwLyhjsvrR\\nGbpyNuiF3GvgcBTVoeq+GQw9fvlrTILbKbQ5CcYyiIrX84ceuhYZNSzT1a6hG/S3\\nfUjXFw/QDirN63iU5fKw22nc\\n-----END PRIVATE KEY-----\\n\",\n  \"client_email\": \"firebase-adminsdk-xyxen@test-27676.iam.gserviceaccount.com\",\n  \"client_id\": \"101220000518732729124\",\n  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\"," +
                                                   "\n  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xyxen%40test-27676.iam.gserviceaccount.com\"," +
                                                   "\n  \"universe_domain\": \"googleapis.com\"\n}\n")
        });
        var messaging = FirebaseMessaging.DefaultInstance;
        var result = await messaging.SendEachAsync([new Message {
            Notification = new Notification {
                Title = messageDto.OperationType + " " + messageDto.DateTime,
                Body = messageDto.Amount / 100 + " " + messageDto.CurrencyType,
                ImageUrl = "https://ihealth.in.ua/wp-content/uploads/2021/09/shutterstock_923986961.jpg"
            },
            Token =
                "epGz-IrsDm9PdLzduCTbKJ:APA91bH_j_k82pi_QwLkYSR4fXjhrwrCsf6y6MaS10xfW4XxX1tHphHiE2jS7g2P8waisS3AjSE4VHNS1D6W1lDE4Bn8NdBaqW5RQ1MTwRgY69YkOnYISwIi51KLyWAhUaIWY1fKCZpb",

        },
        new Message {
            Notification = new Notification {
                Title = messageDto.OperationType + " " + messageDto.DateTime,
                Body = messageDto.Amount / 100 + " " + messageDto.CurrencyType,
                ImageUrl = "https://ihealth.in.ua/wp-content/uploads/2021/09/shutterstock_923986961.jpg"
            },
            Token =
                "elR57jFj0qu6kay6lhG9Ww:APA91bHxzJQfGLhqTEfYkeXQDGgK3yfB4WqKMam8oZN2BHeBeK6gcQeLuY2OOLr4NS8HbcVOiZWXGJ2ZDYFrU8rJiFAhwa7hcz2YrSWwCcjtW1OSdIE0D8-d36eyBREWvHi7qgOYsOEF",

        }]);
    }
}