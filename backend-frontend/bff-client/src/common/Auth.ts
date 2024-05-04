import { REQUEST_ID_HEADER } from 'common/RequestLog'
import { KEY_HEADER } from 'common/config'
import { Request } from 'express'
import { jwtDecode } from 'jwt-decode'

export type ReqMetaInfo = {
  id: string
  token: string
  idempotencyKey?: string
  traceId: string
}

export class ReqHelper {
  public static AuthData(req: Request<any, any, any, any>) {
    const token = req.headers.authorization || ''
    const traceId = req.headers[REQUEST_ID_HEADER] as string
    const info: ReqMetaInfo = {
      token,
      id: '',
      traceId: traceId || 'undefined'
    }
    if (req.headers[KEY_HEADER]) {
      info.idempotencyKey = req.headers[KEY_HEADER] as string
    }
    try {
      info.id = jwtDecode(token).sub || ''
    } catch {}

    return info
  }

  public static XKey(req: Request<any, any, any, any>) {
    return req.headers[KEY_HEADER] as string
  }
}
