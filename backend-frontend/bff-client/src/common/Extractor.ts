import { WithUser } from 'dto/Common'
import { Request } from 'express'

export class Extractor {
  private static readonly _HeaderName = 'authorization'

  static ExtractBody<T>(req: Request<any, any, T>): WithUser<T> {
    return {
      ...req.params,
      ...req.body,
      authId: req.headers[Extractor._HeaderName]?.toString() || '',
    }
  }

  static ExtractParams<T, V>(req: Request<T, any, any, V>): WithUser<T & V> {
    return {
      ...req.params,
      ...req.query,
      authId: req.headers[Extractor._HeaderName]?.toString() || '',
    }
  }

  static ExtractAuthHeader(req: Request) {
    return { authId: req.headers[Extractor._HeaderName]?.toString() || '' }
  }
}
