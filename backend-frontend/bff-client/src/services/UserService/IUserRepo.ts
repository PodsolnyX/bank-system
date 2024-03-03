import { GetProfileDto, UserDto, RegisterDto, RegisterResp } from 'dto/User'

export interface IUserRepo {
  GetProfile(Dto: GetProfileDto): Promise<UserDto>
  Register(Dto: RegisterDto): Promise<RegisterResp>
}
