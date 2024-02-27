import { GetProfileDto, UserDto } from "dto/User"

export interface IUserService {
    GetProfile(Dto: GetProfileDto): Promise<UserDto>
}