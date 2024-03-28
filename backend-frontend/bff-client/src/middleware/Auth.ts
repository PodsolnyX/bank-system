import { NextFunction, Request, Response } from 'express'
import { UserService } from 'services/UserService'

export const AuthMiddlewareFn =
  (UserService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    const status = await UserService.ValidateJWT(token)
    if (status !== 200) {
      res.sendStatus(status)
      return
    }

    next()
  }
