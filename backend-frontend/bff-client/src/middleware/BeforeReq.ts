import { NextFunction, Request, Response } from 'express'
import { CB, mapBffRoute } from 'middleware/CircuitBreaker'

export const BeforeReqFn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const mapping = mapBffRoute(req.url)
    if (mapping) {
      if (!CB.Pass(mapping)) {
        return res.status(503).send('Circuit Breaker')
      }
    }
    
    next()
  }
