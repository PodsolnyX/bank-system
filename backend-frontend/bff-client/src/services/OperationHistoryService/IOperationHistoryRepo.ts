import { PaginationReq, WithUser } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'

export interface IOperationHistoryRepo {
  GetOperationHistory(
    Dto: WithUser<PaginationReq<SearchOperationUserDto>>
  ): Promise<OperationDto[]>
}
