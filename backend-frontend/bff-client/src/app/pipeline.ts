import bodyParser from 'body-parser'
import cors from 'cors'
import type { Response, Router, Request, NextFunction } from 'express'
import {
  AuthMiddleware,
  BeforeReqMiddleware,
  CacheMiddleware,
  NotFoundMiddleware,
} from 'init/Middleware'
import { ROUTER } from 'routes'
import { CORS_CONFIG } from './config'
import { BffRoutes, Microservices } from 'common/Microservices'
import { CB } from 'middleware/CircuitBreaker'
import { CBState } from 'middleware/CircuitBreaker/types'

type AppRoute = [string, Router]
type AppMiddleware = [(req: Request, res: Response, next: NextFunction) => any]
type PipelineItem = AppRoute | AppMiddleware

export const pipeline: PipelineItem[] = [
  [cors(CORS_CONFIG)],
  [bodyParser.json()],
  [BeforeReqMiddleware()],
  [AuthMiddleware()],
  [CacheMiddleware()],
  [BffRoutes.User, ROUTER.USER],
  [BffRoutes.Account, ROUTER.ACCOUNT],
  [BffRoutes.Preferences, ROUTER.PREFERENCES],
  [BffRoutes.Loan, ROUTER.LOAN],
  [BffRoutes.Tariff, ROUTER.TARIFF],
  [BffRoutes.History, ROUTER.HISTORY],
  [NotFoundMiddleware()],
]

setInterval(() => {
  return
  const test = CB._Update(Microservices.Core)
  console.clear()
  const state =
    test.State === CBState.Closed
      ? 'Закрыт'
      : (test.Timeout || 0) < Date.now()
        ? 'Полу'
        : 'Открыт'
  console.log(test.Records.length, test.Timeout, state)
}, 1000)
