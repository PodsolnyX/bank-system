import { ReqMetaInfo } from 'common'
import { PaginationReq } from 'dto/Common/req'
import { SearchOperationUserDto } from 'dto/OperationHistory/req'
import { OperationDto } from 'dto/OperationHistory/resp'
import { OperationAPI } from 'repos/lib'

class OperationHistoryRepo {
  async GetOperationHistory(
    Dto: PaginationReq<SearchOperationUserDto>,
    AuthInfo: ReqMetaInfo
  ) {
    return (
      await OperationAPI.Req(AuthInfo).get<OperationDto[]>('/operation-history/user', {
        params: Dto,
      })
    ).data
  }
}

export default OperationHistoryRepo
