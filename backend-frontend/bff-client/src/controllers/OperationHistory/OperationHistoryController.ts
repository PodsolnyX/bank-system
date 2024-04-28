import { Response } from 'express'
import { GetOperationHistoryReq } from './types'

import { OperationHistoryService } from 'services/OperationHistoryService'
import { ReqHelper } from 'common'
import { ObserverService } from 'services/ObserverService'

class OperationHistoryController {
  private _OperationHistoryService: OperationHistoryService
  private _ObserverService: ObserverService

  constructor(OperationHistoryService: OperationHistoryService, ObserverService: ObserverService) {
    this._OperationHistoryService = OperationHistoryService
    this._ObserverService = ObserverService
  }

  async GetOperationHistory(req: GetOperationHistoryReq, res: Response) {
    const data = await this._OperationHistoryService.GetOperationHistory(
      req.query,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }
}

export default OperationHistoryController
