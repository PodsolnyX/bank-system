import { IOperationHistoryRepo } from 'services/OperationHistoryService'
import { PaginationReq } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'
import { Req } from 'repos/lib'

class OperationHistoryRepo implements IOperationHistoryRepo {
  async GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>) {
    return (
      await Req.Operation.get<OperationDto[]>('/operation-history/user', {
        params: Dto,
      })
    ).data
  }
}

export default OperationHistoryRepo
