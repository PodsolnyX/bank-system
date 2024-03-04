import { PaginationReq } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'
import { OperationAPI } from 'repos/lib'

class OperationHistoryRepo {
  async GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>) {
    return (
      await OperationAPI.Req.get<OperationDto[]>('/operation-history/user', {
        params: Dto,
      })
    ).data
  }
}

export default OperationHistoryRepo
