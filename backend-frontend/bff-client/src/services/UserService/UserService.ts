import { GetProfileDto, RegisterDto } from 'dto/User'
import { UserRepo } from 'repos/UserRepo'

class UserService {
  private _UserRepo: UserRepo

  constructor(UserRepo: UserRepo) {
    this._UserRepo = UserRepo

    this.GetProfile = this.GetProfile.bind(this)
    this.Register = this.Register.bind(this)
  }

  async GetProfile(Dto: GetProfileDto) {
    return await this._UserRepo.GetProfile(Dto)
  }

  async Register(Dto: RegisterDto) {
    return await this._UserRepo.Register(Dto)
  }
}

export default UserService
