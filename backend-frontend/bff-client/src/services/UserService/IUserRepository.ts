import { User } from "../../domain";

export interface IUserRepository {
    GetProfile(): Promise<User>
}