import { PaginationReq } from 'dto/Common'
import { SearchOperationUserDto } from 'dto/OperationHistory'
import { Request } from 'express'

export type GetOperationHistoryReq = Request<
  {},
  {},
  {},
  PaginationReq<SearchOperationUserDto>
>
