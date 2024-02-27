import { Request, Response } from 'express'
import { IUserService } from './IUserService'
import { UserDto } from 'dto/User'

class UserController {
  private _UserService: IUserService

  constructor(UserService: IUserService) {
    this._UserService = UserService
  }

  async GetProfile(req: Request, res: Response) {
    const data = await this._UserService.GetProfile()
    res.status(200).send(data)
  }
}

export default UserController
