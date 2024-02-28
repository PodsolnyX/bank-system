import { Response } from 'express'
import { IOperationHistoryService } from './IOperationHistoryService'
import { GetOperationHistoryReq } from './types'
import { Extractor } from 'common/Extractor'

class OperationHistoryController {
  private _OperationHistoryService: IOperationHistoryService

  constructor(OperationHistoryService: IOperationHistoryService) {
    this._OperationHistoryService = OperationHistoryService
  }

  async GetOperationHistory(req: GetOperationHistoryReq, res: Response) {
    const data = await this._OperationHistoryService.GetOperationHistory(
      Extractor.ExtractBody(req)
    )
    res.status(200).send(data)
  }
}

export default OperationHistoryController
