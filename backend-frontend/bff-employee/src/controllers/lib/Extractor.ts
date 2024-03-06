import { CookieName } from 'config/Auth'
import { WithUser } from 'dto/Common'
import { Request } from 'express'

export class Extractor {
  static ExtractBody<T>(req: Request<any, any, T>): WithUser<T> {
    return {
      ...req.params,
      ...req.body,
      [CookieName]: req.cookies[CookieName]?.toString() || '',
    }
  }

  static ExtractParams<T, V>(req: Request<T, any, any, V>): WithUser<T & V> {
    return {
      ...req.params,
      ...req.query,
      [CookieName]: req.cookies[CookieName]?.toString() || '',
    }
  }
}
