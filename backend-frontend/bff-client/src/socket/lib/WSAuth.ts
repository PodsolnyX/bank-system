import { IncomingMessage } from 'http'
import { jwtDecode } from 'jwt-decode'
import { WS_401 } from './config'

export class WSAuth {
  static Validate(req: IncomingMessage) {
    try {
      const token = req.headers.authorization
      if (!token) {
        return WS_401
      }
      const decoded = jwtDecode(token)
      if (!decoded.sub || !decoded.exp || decoded.exp <= Date.now() / 1000) {
        return WS_401
      }
    } catch {
      return WS_401
    }
  }
}
