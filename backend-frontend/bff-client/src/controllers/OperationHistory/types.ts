import { PaginationReq } from 'dto/Common/req'
import { SearchOperationUserDto } from 'dto/OperationHistory/req'
import { Request } from 'express'

export type GetOperationHistoryReq = Request<
  {},
  {},
  {},
  PaginationReq<SearchOperationUserDto>
>
