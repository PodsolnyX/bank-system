import { Request, Response } from 'express'
import {
  BanUserReq,
  CreateUserReq, GetAccessInfoReq,
  GetUserInfoReq,
  GetUserReq,
  GetUsersReq,
  GetUserStatusReq
} from './types'
import { CookieName } from 'config/Auth'
import { UserService } from 'services/UserService'
import { Extractor } from 'controllers/lib/Extractor'
import {AuthHelper} from "../../common/Auth";

class UserController {
  private _UserService: UserService

  constructor(UserService: UserService) {
    this._UserService = UserService
  }

  async GetAccessInfoById(req: GetAccessInfoReq, res: Response) {
    const data = await this._UserService.GetAccessInfoById(req.params.userid)
    res.status(200).send(data)
  }

  async GetProfile(req: GetUserReq, res: Response) {
    const data = await this._UserService.GetProfile(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetUserInfo(req: GetUserInfoReq, res: Response) {
    const data = await this._UserService.GetUserInfo(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetUsers(req: GetUsersReq, res: Response) {
    const data = await this._UserService.GetUsers(Extractor.ExtractParams(req), AuthHelper.Data(req))
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

  async CreateUser(req: CreateUserReq, res: Response) {
    const id = await this._UserService.CreateUser(Extractor.ExtractBody(req), AuthHelper.Data(req))
    res.status(200).send({ id })
  }

  async GetUserStatus(req: GetUserStatusReq, res: Response) {
    const status = await this._UserService.GetStatus(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(status)
  }

  async BanUser(req: BanUserReq, res: Response) {
    const status = await this._UserService.BanUser(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(status)
  }
}

export default UserController
