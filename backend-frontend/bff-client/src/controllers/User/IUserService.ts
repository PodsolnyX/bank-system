import { GetProfileDto, UserDto, RegisterDto, RegisterResp } from 'dto/User'

export interface IUserService {
  GetProfile(Dto: GetProfileDto): Promise<UserDto>
  Register(Dto: RegisterDto): Promise<RegisterResp>
}
