import { AuthInfo } from 'common'
import { GetProfileDto, GetUserStatusDto, RegisterDto } from 'dto/User'
import { UserRepo } from 'repos/UserRepo'

class UserService {
  private _UserRepo: UserRepo

  constructor(UserRepo: UserRepo) {
    this._UserRepo = UserRepo
  }

  async GetAccessInfoById(id: string) {
    return await this._UserRepo.GetAccessInfoById(id)
  }
}

export default UserService
