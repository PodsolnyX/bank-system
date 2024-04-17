import { NextFunction, Request, Response } from 'express'
import { ObserverService } from 'services/ObserverService'
import { UserService } from 'services/UserService'

export const AuthMiddlewareFn =
  (UserService: UserService, ObserverService: ObserverService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    const status = await UserService.ValidateJWT(token)
    if (status !== 200) {
      res.sendStatus(status)
      ObserverService.Collect(req, status)
      return
    }

    next()
  }
