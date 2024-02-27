import { PaginationReq } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'

export interface IOperationHistoryService {
  GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>): Promise<OperationDto[]>
}
