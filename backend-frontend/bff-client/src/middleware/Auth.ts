import { NextFunction, Request, Response } from 'express'
import { AuthData, Extractor } from 'common'

const AuthMiddlewareFn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { authId } = Extractor.ExtractAuthHeader(req)
    if (!authId) {
      res.sendStatus(401)
      return
    }

    AuthData.Header = authId

    next()
  }

export const AuthMiddleware = () => AuthMiddlewareFn()
