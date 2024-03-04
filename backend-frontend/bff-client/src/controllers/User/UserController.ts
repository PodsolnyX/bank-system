import { Request, Response } from 'express'
import { IUserService } from './IUserService'
import { GetUserReq, RegisterReq } from './types'
import { CookieName } from 'config/Auth'

class UserController {
  private _UserService: IUserService
  private _CookieAuthTime: number

  constructor(UserService: IUserService) {
    this._UserService = UserService
    this._CookieAuthTime = 60 * 24 * 60 * 60 * 1000
  }

  async GetProfile(req: GetUserReq, res: Response) {
    const data = await this._UserService.GetProfile(req.body)
    res.cookie(CookieName, data.mail, {
      maxAge: this._CookieAuthTime,
    })
    res.status(200).send(data)
  }

  async Logout(req: Request, res: Response) {
    if (!req.cookies[this._CookieAuthTime]) {
      res.sendStatus(401)
      return
    }

    res.clearCookie(CookieName)
    res.sendStatus(200)
  }

  async Register(req: RegisterReq, res: Response) {
    const id = await this._UserService.Register(req.body)
    res.cookie(CookieName, req.body.mail, {
      maxAge: this._CookieAuthTime,
    })
    res.status(200).send({ id })
  }
}

export default UserController
