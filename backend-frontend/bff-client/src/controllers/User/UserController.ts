import { Response } from 'express'
import { GetAccessInfoReq } from './types'
import { UserService } from 'services/UserService'

class UserController {
  private _UserService: UserService

  constructor(UserService: UserService) {
    this._UserService = UserService
  }

  async GetAccessInfoById(req: GetAccessInfoReq, res: Response) {
    const data = await this._UserService.GetAccessInfoById(req.params.userid)
    res.status(200).send(data)
  }
}

export default UserController
