import { UserServiceInst } from 'init/User'
import { CacheServiceInst } from 'init/Cache'
import { AuthMiddlewareFn } from 'middleware/Auth'
import { CacheMiddlewareFn } from 'middleware/Cache'
import { BeforeReqFn } from 'middleware/BeforeReq'
import { ObserverServiceInst } from 'init/Observer'
import { NotFoundMiddlewareFn } from 'middleware/NotFound'

export const AuthMiddleware = () => AuthMiddlewareFn(UserServiceInst, ObserverServiceInst)
export const CacheMiddleware = () => CacheMiddlewareFn(CacheServiceInst, ObserverServiceInst)
export const BeforeReqMiddleware = () => BeforeReqFn(ObserverServiceInst)
export const NotFoundMiddleware = () => NotFoundMiddlewareFn(ObserverServiceInst)