import { Request, Response } from 'express'
import { IUserService } from './IUserService'
import { GetUserReq } from './types'
import { AxiosError } from 'axios'
import { CookieAuthTime, CookieName } from 'config/Auth'

class UserController {
  private _UserService: IUserService

  constructor(UserService: IUserService) {
    this._UserService = UserService
  }

  async GetProfile(req: GetUserReq, res: Response) {
    try {
      const data = await this._UserService.GetProfile(req.body)
      res.cookie(CookieName, data.Id, {
        maxAge: CookieAuthTime,
      })
      res.status(200).send(data)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status) {
          res.sendStatus(err.status)
        } else {
          res.sendStatus(500)
        }
      }
    }
  }

  async Logout(req: Request, res: Response) {
    if (!req.cookies[CookieName]) {
      res.sendStatus(401)
      return
    }

    res.clearCookie(CookieName)
    res.sendStatus(200)
  }
}

export default UserController
