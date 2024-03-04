import { AxiosError } from 'axios'
import { AuthData, CookieName } from 'config/Auth'
import { IUserService } from 'controllers/User'
import { NextFunction, Request, Response } from 'express'

export const AuthMiddleware =
  (UserService: IUserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const User = req.cookies[CookieName]
    if (!User) {
      res.sendStatus(401)
      return
    }


    try {
      const profile = await UserService.GetProfile({
        mail: User,
      })

      if (profile.bannedAt) {
        res.sendStatus(403)
        return
      }

      AuthData.Header = profile.id

      next()
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        res.status(err.response.status).send(err.response.data)
      } else {
        res.sendStatus(500)
      }
    }
  }
