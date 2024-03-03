import { UserController } from 'controllers/User'
import { UserService } from 'services/UserService'
import { UserRepo } from 'repos/UserRepo'

export const UserRepositoryInst = new UserRepo()
export const UserServiceInst = new UserService(UserRepositoryInst)
export const UserControllerInst = new UserController(UserServiceInst)
