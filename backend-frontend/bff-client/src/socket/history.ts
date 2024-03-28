import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ParamsExtractor } from 'common'
import { IncomingMessage } from 'http'
import { UserService } from 'services/UserService'
import { WS_STATUSES } from './config'
import { DataTransformer } from './dataTransform'
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
    const jwt = ParamsExtractor.Get(req.url, 'token') || ''
    const status = await this._UserService.ValidateJWT(jwt)
    if (status !== 200) {
      ws.close(WS_STATUSES[status])
    }

    const param = ParamsExtractor.Get(req.url || '', this._param)
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.None)
      .withUrl(this._getUrl(jwt))
      .build()
    connection.start()

    connection.on('receivemessage', (data) => {
      try {
        const obj = DataTransformer(JSON.parse(data))
        if (!param || obj['accountId'] === param) {
          ws.send(JSON.stringify(obj))
        }
      } catch (err) {}
    })
  }
}
