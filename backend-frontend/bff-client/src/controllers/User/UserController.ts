import { Request, Response } from 'express'
import { IUserService } from './IUserService'
import { GetUserReq } from './types'
import { AxiosError } from 'axios'

class UserController {
  private _UserService: IUserService
  private _cookieAuthTime: number
  private _cookieName: string

  constructor(UserService: IUserService) {
    this._UserService = UserService
    this._cookieName = "Authorization"
    this._cookieAuthTime = 60 * 24 * 60 * 60 * 1000
  }

  async GetProfile(req: GetUserReq, res: Response) {
    try {
        const data = await this._UserService.GetProfile(req.body)
        res.status(200).send(data)
        res.cookie("Authorization", data.Id, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: this._cookieAuthTime
        })
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status) {
          res.sendStatus(err.status);
        }
        else {
          res.sendStatus(500);
        }
      }
      
    }
  }

  async Logout(_req: Request, res: Response) {
    res.clearCookie(this._cookieName)
    res.sendStatus(200)
  }
}

export default UserController
