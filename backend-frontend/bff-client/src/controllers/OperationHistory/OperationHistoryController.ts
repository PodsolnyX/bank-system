import { Request, Response } from 'express'
import { IOperationHistoryService } from './IOperationHistoryService'

class OperationHistoryController {
  private _OperationHistoryService: IOperationHistoryService

  constructor(OperationHistoryService: IOperationHistoryService) {
    this._OperationHistoryService = OperationHistoryService
  }

  async GetOperationHistory(req: Request, res: Response) {
    const data = await this._OperationHistoryService.GetOperationHistory()
    res.status(200).send(data)
  }
}

export default OperationHistoryController
