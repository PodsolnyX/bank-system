import { User } from 'entities/User'
import { IUserRepo } from 'services/UserService'
import { AuthReq } from 'request/Auth'
import { GetProfileDto, RegisterDto, RegisterResp } from 'dto/User'

class UserRepo implements IUserRepo {
  async GetProfile(Dto: GetProfileDto) {
    return (
      await AuthReq.get<User>('/auth/user', {
        params: {
          mail: Dto.mail,
        },
      })
    ).data
  }

  async Register(Dto: RegisterDto) {
    return (await AuthReq.post<RegisterResp>('/auth/user', Dto)).data
  }
}

export default UserRepo
