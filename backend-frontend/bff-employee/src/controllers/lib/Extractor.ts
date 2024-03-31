import { Request } from 'express'

export class Extractor {
  static ExtractBody<T>(req: Request<any, any, T>) {
    return {
      ...req.params,
      ...req.body
    }
  }

  static ExtractParams<T, V>(req: Request<T, any, any, V>) {
    return {
      ...req.params,
      ...req.query
    }
  }
}
