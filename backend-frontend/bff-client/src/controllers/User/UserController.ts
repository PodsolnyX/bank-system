import { Request, Response } from 'express'
import { GetUserReq, GetUserStatusReq, RegisterReq } from './types'
import { UserService } from 'services/UserService'
import { Extractor } from 'common'

class UserController {
  private _UserService: UserService
  private _CookieAuthTime: number

  constructor(UserService: UserService) {
    this._UserService = UserService
    this._CookieAuthTime = 60 * 24 * 60 * 60 * 1000
  }

  async GetProfile(req: GetUserReq, res: Response) {
    const data = await this._UserService.GetProfile(Extractor.ExtractParams(req))
    /*res.cookie(CookieName, data.mail, {
      maxAge: this._CookieAuthTime,
    })*/
    res.status(200).send(data)
  }

  async Logout(req: Request, res: Response) {
    /*if (!req.cookies[CookieName]) {
      res.sendStatus(401)
      return
    }

    res.clearCookie(CookieName)*/
    res.sendStatus(200)
  }

  async Register(req: RegisterReq, res: Response) {
    const id = await this._UserService.Register(Extractor.ExtractBody(req))
    /*res.cookie(CookieName, req.body.mail, {
      maxAge: this._CookieAuthTime,
    })*/
    res.status(200).send({ id })
  }

  async GetUserStatus(req: GetUserStatusReq, res: Response) {
    const status = await this._UserService.GetStatus(Extractor.ExtractParams(req))
    res.status(200).send(status)
  }
}

export default UserController
