import { GetProfileDto, GetUserStatusDto, RegisterDto } from 'dto/User'
import { UserRepo } from 'repos/UserRepo'

class UserService {
  private _UserRepo: UserRepo

  constructor(UserRepo: UserRepo) {
    this._UserRepo = UserRepo
  }

  async GetProfile(Dto: GetProfileDto) {
    return await this._UserRepo.GetProfile(Dto)
  }

  async GetStatus(Dto: GetUserStatusDto) {
    return await this._UserRepo.GetStatus(Dto)
  }

  async Register(Dto: RegisterDto) {
    return await this._UserRepo.Register(Dto)
  }
}

export default UserService
