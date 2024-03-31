import { AuthInfo } from 'common'
import { PaginationReq } from 'dto/Common/req'
import { SearchOperationUserDto } from 'dto/OperationHistory/req'
import { OperationHistoryRepo } from 'repos/OperationHistoryRepo'

class OperationHistoryService {
  private _OperationHistoryRepo: OperationHistoryRepo

  constructor(OperationHistoryRepo: OperationHistoryRepo) {
    this._OperationHistoryRepo = OperationHistoryRepo
  }

  async GetOperationHistory(
    Dto: PaginationReq<SearchOperationUserDto>,
    AuthInfo: AuthInfo
  ) {
    return await this._OperationHistoryRepo.GetOperationHistory(Dto, AuthInfo)
  }
}

export default OperationHistoryService
