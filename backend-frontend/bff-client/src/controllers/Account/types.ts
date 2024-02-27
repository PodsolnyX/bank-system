import { Request } from 'express'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq, WithUser } from 'dto/Common'

export type OpenAccountReq = Request<{}, {}, WithUser<OpenAccountDto>>
export type CloseAccountReq = Request<{}, {}, WithUser<CloseAccountDto>>
export type GetAccountsReq = Request<{}, {}, WithUser<PaginationReq<SearchAccountDto>>>
export type GetAccountReq = Request<{}, {}, WithUser<GetAccountDto>>
export type DepositReq = Request<{}, {}, WithUser<DepositDto>>
export type WithdrawReq = Request<{}, {}, WithUser<WithdrawDto>>
