import { AxiosError } from 'axios'
import { AuthData, HeaderName } from 'config/Auth'
import { NextFunction, Request, Response } from 'express'
import { UserService } from 'services/UserService'

export const AuthMiddleware =
  (UserService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const UserId = req.headers[HeaderName]
    if (!UserId) {
      res.sendStatus(401)
      return
    }

    try {
      /*const profile = await UserService.GetProfile({
        mail: 'string',
      })

      if (profile.bannedAt) {
        res.sendStatus(403)
        return
      }*/

      AuthData.Header = UserId

      next()
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        res.status(err.response.status).send(err.response.data)
      } else {
        res.sendStatus(500)
      }
    }
  }
