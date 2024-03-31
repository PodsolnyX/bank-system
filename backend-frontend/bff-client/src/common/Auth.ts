import { Request } from 'express'
import { jwtDecode } from 'jwt-decode'

export type AuthInfo = {
  id: string
  token: string
}

export class AuthHelper {
  public static Data(req: Request<any, any, any, any>) {
    const token = req.headers.authorization || ''
    const info: AuthInfo = {
      token,
      id: '',
    }
    try {
      info.id = jwtDecode(token).sub || ''
    } catch {}

    return info
  }
}
