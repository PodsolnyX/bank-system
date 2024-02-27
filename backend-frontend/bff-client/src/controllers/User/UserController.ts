import { Response } from 'express'
import { IUserService } from './IUserService'
import { GetUserReq } from './types'

class UserController {
  private _UserService: IUserService

  constructor(UserService: IUserService) {
    this._UserService = UserService
  }

  async GetProfile(req: GetUserReq, res: Response) {
    const data = await this._UserService.GetProfile(req.body)
    res.status(200).send(data)
  }
}

export default UserController
