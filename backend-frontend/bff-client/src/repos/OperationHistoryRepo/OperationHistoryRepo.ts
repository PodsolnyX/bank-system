import { IOperationHistoryRepo } from 'services/OperationHistoryService'
import { OperationReq } from 'request/Operation'
import { PaginationReq, WithUser } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'

class OperationHistoryRepo implements IOperationHistoryRepo {
  async GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>) {
    return (
      await OperationReq.get<OperationDto[]>('/operation-history/user', {
        params: Dto,
      })
    ).data
  }
}

export default OperationHistoryRepo
