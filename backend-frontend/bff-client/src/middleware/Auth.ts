import { NextFunction, Request, Response } from 'express'
import { AuthData } from 'common'

const AuthMiddlewareFn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      res.sendStatus(401)
      return
    }

    AuthData.Data = token

    next()
  }

export const AuthMiddleware = () => AuthMiddlewareFn()
