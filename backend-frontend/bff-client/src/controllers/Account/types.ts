import { Request } from 'express'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
  TransferSelfDto,
  TransferUserDto,
  AccountPriorityDto,
} from 'dto/Account/req'
import { PaginationReq } from 'dto/Common/req'

export type OpenAccountReq = Request<{}, {}, {}, OpenAccountDto>
export type CloseAccountReq = Request<CloseAccountDto>
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
export type TransferSelfReq = Request<
  Omit<TransferSelfDto, 'amount'>,
  {},
  {},
  Pick<TransferSelfDto, 'amount'>
>

export type TransferUserReq = Request<
  Omit<TransferUserDto, 'amount'>,
  {},
  {},
  Pick<TransferUserDto, 'amount'>
>

export type MakePriorityReq = Request<AccountPriorityDto>
