import { User } from "../domain";
import { IUserRepository } from "services/UserService";
import axios from 'axios';

class UserRepository implements IUserRepository {
    async GetProfile() {
        return (await axios.get<User>('https://jsonplaceholder.typicode.com/todos/1')).data
    }
}

export default new UserRepository()