import { NextFunction, Request, Response } from 'express'
import { jwtDecode } from 'jwt-decode'
import { UserService } from 'services/UserService'

export const AuthMiddlewareFn =
  (UserService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      res.sendStatus(401)
      return
    }

    try {
      const decoded = jwtDecode(token)
      if (!decoded.sub || !decoded.exp || decoded.exp <= Date.now() / 1000) {
        res.sendStatus(401)
        return
      }

      const authData = await UserService.GetAccessInfoById(decoded.sub)

      if (authData.bannedAt) {
        res.sendStatus(403)
        return
      }
    } catch {
      res.sendStatus(401)
      return
    }

    next()
  }
