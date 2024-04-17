import { KEY_HEADER } from 'app/config'
import { NextFunction, Request, Response } from 'express'
import { CacheService } from 'services/CacheService'
import { ObserverService } from 'services/ObserverService'

export const CacheMiddlewareFn =
  (CacheService: CacheService, ObserverService: ObserverService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!['POST', 'PATCH'].includes(req.method)) {
      return next()
    }

    const key = req.headers[KEY_HEADER]

    if (!key || Array.isArray(key)) {
      res.sendStatus(400)
      ObserverService.Collect(req, 400)
      return
    }

    const cached = await CacheService.Get(key)
    if (cached) {
      res.status(cached.status)
      if (cached.data) {
        res.send(cached.data)
      }
      ObserverService.Collect(req, 400, cached.data)
      return
    }

    next()
  }
