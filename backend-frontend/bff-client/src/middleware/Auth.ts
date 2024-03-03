import { IUserService } from 'controllers/User'
import { NextFunction, Request, Response } from 'express'
import { MainInstance } from 'request/MainInstance'

export const AuthMiddleware =
  (UserService: IUserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const User = req.cookies.XApiKey
    if (!User) {
      res.sendStatus(401)
      return
    }

    MainInstance.defaults.headers.XApiKey = User

    const profile = await UserService.GetProfile(User)

    if (profile.BanedAt) {
      res.sendStatus(403)
      return
    }

    next()
  }
