import { PaginationReq, WithUser } from 'dto/Common'
import { SearchOperationUserDto } from 'dto/OperationHistory'
import { OperationHistoryRepo } from 'repos/OperationHistoryRepo'

class OperationHistoryService {
  private _OperationHistoryRepo: OperationHistoryRepo

  constructor(OperationHistoryRepo: OperationHistoryRepo) {
    this._OperationHistoryRepo = OperationHistoryRepo

    this.GetOperationHistory = this.GetOperationHistory.bind(this)
  }

  async GetOperationHistory(Dto: WithUser<PaginationReq<SearchOperationUserDto>>) {
    return await this._OperationHistoryRepo.GetOperationHistory(Dto)
  }
}

export default OperationHistoryService
