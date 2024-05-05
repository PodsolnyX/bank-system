import { KEY_HEADER } from 'common/config'
import { NextFunction, Request, Response } from 'express'
import { CacheService } from 'services/CacheService'
import { ObserverService } from 'services/ObserverService'

const checkCache = true

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

    if (checkCache) {
      const cached = await CacheService.Get(key)
      if (cached) {
        let sendData = cached.data
        
        if (sendData) {
          try {
            sendData = JSON.parse(sendData)
          } catch {}
        }
        
        res.status(cached.status).send(sendData || undefined)
        ObserverService.Collect(req, cached.status)
        return
      }
    }
    next()
  }
