import {GetProfileDto, GetUserStatusDto, GetUserStatusResp, UserCreateResp, UserCreateDto, UserDto} from 'dto/User'
import {AuthAPI} from "repos/lib";
import {UserBanDto} from "../../dto/User/UserBanDto";

class UserService {

  constructor() {

    this.GetStatus = this.GetStatus.bind(this)
    this.GetUsers = this.GetUsers.bind(this)
    this.CreateUser = this.CreateUser.bind(this)
  }

  async GetStatus(Dto: GetUserStatusDto) {
    return (await AuthAPI.Req.get<GetUserStatusResp>('/auth/user', { params: Dto })).data
  }

  async GetUsers(Dto: GetProfileDto) {
    return (
        await AuthAPI.Req.get<UserDto[]>('/auth/employee', {
          params: Dto,
        })
    ).data
  }

  async CreateUser(Dto: UserCreateDto) {
    return (
        await AuthAPI.Req.post<UserCreateResp>('/auth/employee', {
          params: Dto,
        })
    ).data
  }

  async BanUser(Dto: UserBanDto) {
    return (await AuthAPI.Req.post(`/auth/employee/${Dto.UserId}`)).data
  }
}

export default UserService
