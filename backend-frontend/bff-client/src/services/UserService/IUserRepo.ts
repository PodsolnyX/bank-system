import { GetProfileDto, UserDto } from 'dto/User'

export interface IUserRepo {
  GetProfile(Dto: GetProfileDto): Promise<UserDto>
}
