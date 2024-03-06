import { Request } from 'express'
import {
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq } from 'dto/Common'

export type GetAccountsReq = Request<{}, {}, {}, PaginationReq<SearchAccountDto>>
export type GetAccountReq = Request<GetAccountDto>

