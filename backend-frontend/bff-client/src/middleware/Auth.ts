import { NextFunction, Request, Response } from 'express'

const AuthMiddlewareFn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      res.sendStatus(401)
      return
    }
    next()
  }

export const AuthMiddleware = () => AuthMiddlewareFn()
