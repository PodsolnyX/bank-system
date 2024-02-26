import { User } from "entities/User";
import { IUserRepo } from "services/UserService";
import axios from 'axios';

class UserRepo implements IUserRepo {
    async GetProfile() {
        return (await axios.get<User>('https://jsonplaceholder.typicode.com/todos/1')).data
    }
}

export default UserRepo