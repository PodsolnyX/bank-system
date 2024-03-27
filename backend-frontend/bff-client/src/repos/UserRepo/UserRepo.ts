import { AccessDto } from 'dto/User'
import { AuthAPI } from 'repos/lib'

class UserRepo {
  async GetAccessInfoById(id: string) {
    return (await AuthAPI.Req(null).get<AccessDto>(`/public/${id}`)).data
  }
}

export default UserRepo
