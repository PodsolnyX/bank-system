import { IUserService } from 'controllers/User'
import { IUserRepo } from 'services/UserService'
import { GetProfileDto, RegisterDto } from 'dto/User'

class UserService implements IUserService {
  private _UserRepo: IUserRepo

  constructor(UserRepo: IUserRepo) {
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
