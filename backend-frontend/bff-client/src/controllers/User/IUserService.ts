import { User } from "entities/User"

export interface IUserService {
    GetProfile(): Promise<User>
}