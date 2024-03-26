import { Response } from 'express'
import { GetUserReq, GetUserStatusReq, RegisterReq } from './types'
import { UserService } from 'services/UserService'
import { AuthHelper } from 'common'

class UserController {
  private _UserService: UserService

  constructor(UserService: UserService) {
    this._UserService = UserService
  }

  async GetProfile(req: GetUserReq, res: Response) {
    const data = await this._UserService.GetProfile(req.query, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetUserStatus(req: GetUserStatusReq, res: Response) {
    const status = await this._UserService.GetStatus(req.query, AuthHelper.Data(req))
    res.status(200).send(status)
  }
}

export default UserController
