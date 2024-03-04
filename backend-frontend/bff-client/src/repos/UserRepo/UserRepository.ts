import { User } from 'entities/User'
import { IUserRepo } from 'services/UserService'
import { GetProfileDto, RegisterDto, RegisterResp } from 'dto/User'
import { Req } from 'repos/lib'

class UserRepo implements IUserRepo {
  async GetProfile(Dto: GetProfileDto) {
    return (
      await Req.Auth.get<User>('/auth/user', {
        params: Dto,
      })
    ).data
  }

  async Register(Dto: RegisterDto) {
    return (await Req.Auth.post<RegisterResp>('/auth/user', Dto)).data
  }
}

export default UserRepo
