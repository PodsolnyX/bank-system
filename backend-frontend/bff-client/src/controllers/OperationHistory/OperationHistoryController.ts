import { Response } from 'express'
import { IOperationHistoryService } from './IOperationHistoryService'
import { GetOperationHistoryReq } from './types'

class OperationHistoryController {
  private _OperationHistoryService: IOperationHistoryService

  constructor(OperationHistoryService: IOperationHistoryService) {
    this._OperationHistoryService = OperationHistoryService
  }

  async GetOperationHistory(req: GetOperationHistoryReq, res: Response) {
    const data = await this._OperationHistoryService.GetOperationHistory(req.body)
    res.status(200).send(data)
  }
}

export default OperationHistoryController
