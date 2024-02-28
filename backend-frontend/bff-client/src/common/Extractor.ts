import { CookieName } from 'config/Auth'
import { Request } from 'express'

export class Extractor {
  static ExtractBody(req: Request) {
    return {
      ...req.body,
      Authorization: req.headers[CookieName],
    }
  }

  static ExtractParams(req: Request) {
    return {
      ...req.params,
      Authorization: req.headers[CookieName],
    }
  }
}
