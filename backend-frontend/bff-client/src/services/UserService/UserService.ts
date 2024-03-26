import { AuthInfo } from 'common'
import { GetProfileDto, GetUserStatusDto, RegisterDto } from 'dto/User'
import { UserRepo } from 'repos/UserRepo'

class UserService {
  private _UserRepo: UserRepo

  constructor(UserRepo: UserRepo) {
    this._UserRepo = UserRepo
  }

  async GetProfile(Dto: GetProfileDto, AuthInfo: AuthInfo) {
    return await this._UserRepo.GetProfile(Dto, AuthInfo)
  }

  async GetStatus(Dto: GetUserStatusDto, AuthInfo: AuthInfo) {
    return await this._UserRepo.GetStatus(Dto, AuthInfo)
  }
}

export default UserService
