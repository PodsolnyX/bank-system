import { KEY_HEADER } from 'app/config'
import { NextFunction, Request, Response } from 'express'
import { CacheService } from 'services/CacheService'

export const CacheMiddlewareFn =
  (CacheService: CacheService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!['POST', 'PATCH'].includes(req.method)) {
      return next()
    }

    const key = req.headers[KEY_HEADER]

    if (!key || Array.isArray(key)) {
      return res.sendStatus(400)
    }

    const cached = await CacheService.Get(key)
    if (cached) {
      res.status(cached.status)
      if (cached.data) {
        res.send(cached.data)
      }
      return; 
    }

    next()
  }
