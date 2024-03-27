import { Response } from 'express'
import { GetUserReq, GetUserStatusReq, RegisterReq } from './types'
import { UserService } from 'services/UserService'
import { AuthHelper } from 'common'

// deprecated
class UserController {
  private _UserService: UserService

  constructor(UserService: UserService) {
    this._UserService = UserService
  }
}

export default UserController
