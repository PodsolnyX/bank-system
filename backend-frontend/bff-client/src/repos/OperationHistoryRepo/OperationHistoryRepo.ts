import { AuthInfo } from 'common'
import { PaginationReq } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'
import { OperationAPI } from 'repos/lib'

class OperationHistoryRepo {
  async GetOperationHistory(
    Dto: PaginationReq<SearchOperationUserDto>,
    AuthInfo: AuthInfo
  ) {
    return (
      await OperationAPI.Req(AuthInfo).get<OperationDto[]>('/operation-history/user', {
        params: Dto,
      })
    ).data
  }
}

export default OperationHistoryRepo
