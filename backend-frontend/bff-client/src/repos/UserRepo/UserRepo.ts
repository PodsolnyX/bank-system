import { User } from 'entities/User'
import { GetProfileDto, GetUserStatusDto, GetUserStatusResp } from 'dto/User'
import { AuthAPI } from 'repos/lib'
import { AuthInfo } from 'common'

class UserRepo {
  async GetProfile(Dto: GetProfileDto, AuthInfo: AuthInfo) {
    return (
      await AuthAPI.Req(AuthInfo).get<User>('/auth/user', {
        params: Dto,
      })
    ).data
  }

  async GetStatus(Dto: GetUserStatusDto, AuthInfo: AuthInfo) {
    return (
      await AuthAPI.Req(AuthInfo).get<GetUserStatusResp>('/auth/user', { params: Dto })
    ).data
  }
}

export default UserRepo
