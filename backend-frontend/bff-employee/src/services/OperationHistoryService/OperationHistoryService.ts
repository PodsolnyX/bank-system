import { PaginationReq, WithUser } from 'dto/Common'
import {OperationDto, SearchOperationUserDto} from 'dto/OperationHistory'
import {OperationAPI} from "repos/lib";

class OperationHistoryService {

  constructor() {

    this.GetOperationHistory = this.GetOperationHistory.bind(this)
  }

  async GetOperationHistory(Dto: WithUser<PaginationReq<SearchOperationUserDto>>) {
    return (
        await OperationAPI.Req.get<OperationDto[]>('/operation-history/employee', {
          params: Dto,
        })
    ).data
  }
}

export default OperationHistoryService
