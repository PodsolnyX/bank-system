import { CookieName } from 'config/Auth'
import { WithUser } from 'dto/Common'
import { Request } from 'express'

export class Extractor {
  static ExtractBody<T>(req: Request<{}, {}, T>): WithUser<T> {
    return {
      ...req.body,
      [CookieName]: req.cookies[CookieName]?.toString() || '',
    }
  }

  static ExtractParams<T>(req: Request<T>): WithUser<T> {
    return {
      ...req.params,
      [CookieName]: req.cookies[CookieName]?.toString() || '',
    }
  }
}
