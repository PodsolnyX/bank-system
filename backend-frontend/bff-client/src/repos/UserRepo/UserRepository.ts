import { User } from 'entities/User'
import { IUserRepo } from 'services/UserService'
import { MainInstance } from 'request/MainInstance'

class UserRepo implements IUserRepo {
  async GetProfile() {
    return (await MainInstance.get<User>('https://jsonplaceholder.typicode.com/todos/1'))
      .data
  }
}

export default UserRepo