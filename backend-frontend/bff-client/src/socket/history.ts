import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ParamsExtractor } from 'common'
import { IncomingMessage } from 'http'
import { UserService } from 'services/UserService'
import { WS_STATUSES } from 'socket/config'
import WebSocket from 'ws'

export class WSHistory {
  private readonly _url = 'http://109.107.189.133:7004/api/notifications?access_token='
  private readonly _param = 'accountId'

  private _UserService: UserService

  constructor(UserService: UserService) {
    this._UserService = UserService

    this._getUrl = this._getUrl.bind(this)
    this.connection = this.connection.bind(this)
  }

  private _getUrl(token: string) {
    return `${this._url}${token}`
  }

  public async connection(ws: WebSocket, req: IncomingMessage) {
    const status = await this._UserService.ValidateJWT(req.headers.authorization)
    if (status !== 200) {
      ws.close(WS_STATUSES[status])
    }

    const param = ParamsExtractor.Get(req.url || '', this._param)
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.None)
      .withUrl(this._getUrl(req.headers.authorization!))
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
