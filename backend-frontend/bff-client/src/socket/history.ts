import { HubConnectionBuilder } from '@microsoft/signalr'
import { IncomingMessage } from 'http'
import { WSAuth } from 'socket/lib'
import WebSocket from 'ws'

export class WSHistory {
  static readonly url = 'http://109.107.189.133:7004/api/notifications?access_token='
  private static getUrl(token: string) {
    return `${WSHistory.url}${token}`
  }

  static connection(ws: WebSocket, req: IncomingMessage) {
    const error = WSAuth.Validate(req)

    if (error) {
      ws.close(error)
    }

    const connection = new HubConnectionBuilder()
      .withUrl(WSHistory.getUrl(req.headers.authorization!))
      .build()
    connection.start()
    connection.on('receivemessage', (data) => {
      ws.send(data)
    })
  }
}
