import { Request, Response } from 'express'
import { ObserverService } from 'services/ObserverService'

export const NotFoundMiddlewareFn =
  (ObserverService: ObserverService) => async (req: Request, res: Response) => {
    res.sendStatus(404)
    ObserverService.Collect(req, 404)
  }
