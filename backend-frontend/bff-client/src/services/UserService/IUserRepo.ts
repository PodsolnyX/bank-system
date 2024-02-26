import { User } from "entities/User";

export interface IUserRepo {
    GetProfile(): Promise<User>
}