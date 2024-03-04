import { User } from 'entities/User'
import { GetProfileDto, RegisterDto, RegisterResp } from 'dto/User'
import { AuthAPI } from 'repos/lib'

class UserRepo {
  async GetProfile(Dto: GetProfileDto) {
    return (
      await AuthAPI.Req.get<User>('/auth/user', {
        params: Dto,
      })
    ).data
  }

  async Register(Dto: RegisterDto) {
    return (await AuthAPI.Req.post<RegisterResp>('/auth/user', Dto)).data
  }
}

export default UserRepo
