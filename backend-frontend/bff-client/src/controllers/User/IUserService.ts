import { User } from "../../domain";

export interface IUserService {
    GetProfile(): Promise<User>
}