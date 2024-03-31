import bodyParser from 'body-parser'
import cors from 'cors'
import type { Response, Router, Request, NextFunction } from 'express'
import { AuthMiddleware } from 'init/AuthMiddleware'
import { ROUTER } from 'routes'
import { CORS_CONFIG } from './config'

type AppRoute = [string, Router]
type AppMiddleware = [(req: Request, res: Response, next: NextFunction) => any]
type PipelineItem = AppRoute | AppMiddleware

export const pipeline: PipelineItem[] = [
  [cors(CORS_CONFIG)],
  [bodyParser.json()],
  [AuthMiddleware()],
  ['/auth/user', ROUTER.USER],
  ['/account/user', ROUTER.ACCOUNT],
  ['/preferences/user', ROUTER.PREFERENCES],
  ['/loan/user', ROUTER.LOAN],
  ['/tariff/user', ROUTER.TARIFF],
  ['/operation-history/user', ROUTER.HISTORY],
  [(_req: any, res: Response) => res.sendStatus(404)],
]