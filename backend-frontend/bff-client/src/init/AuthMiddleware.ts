import { UserServiceInst } from 'init/User'
import { AuthMiddlewareFn } from 'middleware/Auth'

export const AuthMiddleware = () => AuthMiddlewareFn(UserServiceInst)
