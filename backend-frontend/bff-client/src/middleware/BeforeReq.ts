import { REQUEST_ID_HEADER, REQUEST_TIME_START_HEADER } from 'common'
import { NextFunction, Request, Response } from 'express'
import { CB, mapBffRoute } from 'middleware/CircuitBreaker'
import { ObserverService } from 'services/ObserverService'
import { v4 as uuidv4 } from 'uuid'
const CB_ACTIVE = false

export const BeforeReqFn =
  (ObserverService: ObserverService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.headers[REQUEST_ID_HEADER] = uuidv4()
    req.headers[REQUEST_TIME_START_HEADER] = Date.now().toString()

    if (CB_ACTIVE) {
      const mapping = mapBffRoute(req.url)
      if (mapping) {
        if (!CB.Pass(mapping)) {
          res.status(503).send('Circuit Breaker')
          ObserverService.Collect(req, 503)
          return
        }
      }
    }

    next()
  }
