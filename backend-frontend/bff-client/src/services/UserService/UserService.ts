import { IUserService } from 'controllers/User'
import { IUserRepo } from 'services/UserService'
import { GetProfileDto } from 'dto/User'

class UserService implements IUserService {
  private _UserRepo: IUserRepo

  constructor(UserRepo: IUserRepo) {
    this._UserRepo = UserRepo

    this.GetProfile = this.GetProfile.bind(this)
  }

  async GetProfile(Dto: GetProfileDto) {
    return await this._UserRepo.GetProfile(Dto)
  }
}

export default UserService
