import { PaginationReq, WithUser } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'

export interface IOperationHistoryService {
  GetOperationHistory(
    Dto: WithUser<PaginationReq<SearchOperationUserDto>>
  ): Promise<OperationDto[]>
}
