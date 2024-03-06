import { UserController } from 'controllers/User'
import { UserService } from 'services/UserService'

export const UserServiceInst = new UserService()
export const UserControllerInst = new UserController(UserServiceInst)
