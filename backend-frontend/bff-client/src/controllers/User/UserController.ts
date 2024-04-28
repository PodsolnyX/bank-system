import { Response } from 'express'
import { GetAccessInfoReq } from './types'
import { UserService } from 'services/UserService'
import { ObserverService } from 'services/ObserverService'

class UserController {
  private _UserService: UserService
  private _ObserverService: ObserverService

  constructor(UserService: UserService, ObserverService: ObserverService) {
    this._UserService = UserService
    this._ObserverService = ObserverService
  }

  async GetAccessInfoById(req: GetAccessInfoReq, res: Response) {
    const data = await this._UserService.GetAccessInfoById(req.params.userid)
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }
}

export default UserController
