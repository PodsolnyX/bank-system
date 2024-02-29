import { IOperationHistoryService } from 'controllers/OperationHistory'
import { IOperationHistoryRepo } from 'services/OperationHistoryService'
import { PaginationReq, WithUser } from 'dto/Common'
import { SearchOperationUserDto } from 'dto/OperationHistory'

class OperationHistoryService implements IOperationHistoryService {
  private _OperationHistoryRepo: IOperationHistoryRepo

  constructor(OperationHistoryRepo: IOperationHistoryRepo) {
    this._OperationHistoryRepo = OperationHistoryRepo

    this.GetOperationHistory = this.GetOperationHistory.bind(this)
  }

  async GetOperationHistory(Dto: WithUser<PaginationReq<SearchOperationUserDto>>) {
    return await this._OperationHistoryRepo.GetOperationHistory(Dto)
  }
}

export default OperationHistoryService
