import { UserServiceInst } from 'init/User'
import { CacheServiceInst } from 'init/Cache'
import { AuthMiddlewareFn } from 'middleware/Auth'
import { CacheMiddlewareFn } from 'middleware/Cache'
import { BeforeReqFn } from 'middleware/BeforeReq'

export const AuthMiddleware = () => AuthMiddlewareFn(UserServiceInst)
export const CacheMiddleware = () => CacheMiddlewareFn(CacheServiceInst)
export const BeforeReqMiddleware = () => BeforeReqFn()