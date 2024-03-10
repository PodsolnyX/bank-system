import { Request } from 'express'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq } from 'dto/Common'

export type OpenAccountReq = Request<{}, {}, {}, OpenAccountDto>
export type CloseAccountReq = Request<{}, {}, CloseAccountDto>
export type GetAccountsReq = Request<{}, {}, {}, PaginationReq<SearchAccountDto>>
export type GetAccountReq = Request<GetAccountDto>
export type DepositReq = Request<
  Pick<DepositDto, 'accountId'>,
  {},
  {},
  Omit<DepositDto, 'accountId'>
>
export type WithdrawReq = Request<
  Pick<WithdrawDto, 'accountId'>,
  {},
  {},
  Omit<WithdrawDto, 'accountId'>
>
