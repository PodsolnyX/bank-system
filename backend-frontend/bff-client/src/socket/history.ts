import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ParamsExtractor } from 'common'
import { IncomingMessage } from 'http'
import { WSAuth } from 'socket/lib'
import WebSocket from 'ws'

export class WSHistory {
  static readonly url = 'http://109.107.189.133:7004/api/notifications?access_token='
  static readonly param = 'accountId'

  private static getUrl(token: string) {
    return `${WSHistory.url}${token}`
  }

  static connection(ws: WebSocket, req: IncomingMessage) {
    const error = WSAuth.Validate(req)
    if (error) {
      ws.close(error)
    }

    const param = ParamsExtractor.Get(req.url || '', WSHistory.param)
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.None)
      .withUrl(WSHistory.getUrl(req.headers.authorization!))
      .build()
    connection.start()

    connection.on('receivemessage', (data) => {
      if (!param) {
        ws.send(data)
      }
      try {
        const obj = JSON.parse(data)
        if (obj['AccountId'] === param) {
          ws.send(data)
        }
      } catch {}
    })
  }
}
