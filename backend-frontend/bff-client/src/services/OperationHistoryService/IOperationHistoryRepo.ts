import { PaginationReq } from "dto/Common"
import { SearchOperationUserDto, OperationDto } from "dto/OperationHistory"

export interface IOperationHistoryRepo {
    GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>): Promise<OperationDto>
}