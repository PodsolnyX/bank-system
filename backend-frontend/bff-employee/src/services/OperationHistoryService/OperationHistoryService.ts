import { PaginationReq } from 'dto/Common'
import {OperationDto, SearchOperationUserDto} from 'dto/OperationHistory'
import {OperationAPI} from "repos/lib";
import {AuthInfo} from "common/Auth";

class OperationHistoryService {

  constructor() {

    this.GetOperationHistory = this.GetOperationHistory.bind(this)
  }

  async GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>, AuthInfo: AuthInfo) {
    return (
        await OperationAPI.Req(AuthInfo).get<OperationDto[]>('/operation-history/employee', {
          params: Dto,
        })
    ).data
  }
}

export default OperationHistoryService
