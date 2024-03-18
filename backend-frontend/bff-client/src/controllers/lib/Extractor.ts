import { HeaderName } from 'config/Auth'
import { WithUser } from 'dto/Common'
import { Request } from 'express'

export class Extractor {
  static ExtractBody<T>(req: Request<any, any, T>): WithUser<T> {
    return {
      ...req.params,
      ...req.body,
      authId: req.headers[HeaderName]?.toString() || '',
    }
  }

  static ExtractParams<T, V>(req: Request<T, any, any, V>): WithUser<T & V> {
    return {
      ...req.params,
      ...req.query,
      authId: req.headers[HeaderName]?.toString() || '',
    }
  }

  static ExtractHeader(req: Request) {
    return { authId: req.headers[HeaderName]?.toString() || '' }
  }
}
