import { Request, Response } from 'express'
import { IUserService } from './IUserService'
import { GetUserReq, RegisterReq } from './types'
import { CookieAuthTime, CookieName } from 'config/Auth'

class UserController {
  private _UserService: IUserService

  constructor(UserService: IUserService) {
    this._UserService = UserService
  }

  async GetProfile(req: GetUserReq, res: Response) {
    const data = await this._UserService.GetProfile(req.body)
    res.cookie(CookieName, data.mail, {
      maxAge: CookieAuthTime,
    })
    res.status(200).send(data)
  }

  async Logout(req: Request, res: Response) {
    if (!req.cookies[CookieName]) {
      res.sendStatus(401)
      return
    }

    res.clearCookie(CookieName)
    res.sendStatus(200)
  }

  async Register(req: RegisterReq, res: Response) {
    const id = await this._UserService.Register(req.body)
    res.cookie(CookieName, req.body.mail, {
      maxAge: CookieAuthTime,
    })
    res.status(200).send({ id })
  }
}

export default UserController
