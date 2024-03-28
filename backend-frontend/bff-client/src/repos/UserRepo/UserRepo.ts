import { AccessDto } from 'dto/User/resp'
import { UserAPI } from 'repos/lib'

class UserRepo {
  async GetAccessInfoById(id: string) {
    return (await UserAPI.Req(null).get<AccessDto>(`/public/${id}`)).data
  }
}

export default UserRepo
