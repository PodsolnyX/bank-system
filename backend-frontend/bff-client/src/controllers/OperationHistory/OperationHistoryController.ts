import { Response } from 'express'
import { GetOperationHistoryReq } from './types'
import { Extractor } from '../lib/Extractor'
import { OperationHistoryService } from 'services/OperationHistoryService'

class OperationHistoryController {
  private _OperationHistoryService: OperationHistoryService

  constructor(OperationHistoryService: OperationHistoryService) {
    this._OperationHistoryService = OperationHistoryService
  }

  async GetOperationHistory(req: GetOperationHistoryReq, res: Response) {
    const data = await this._OperationHistoryService.GetOperationHistory(
      Extractor.ExtractParams(req)
    )
    res.status(200).send(data)
  }
}

export default OperationHistoryController
