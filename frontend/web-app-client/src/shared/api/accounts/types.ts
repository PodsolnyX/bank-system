import { Account, CurrencyType, PaginationReq } from 'shared/entities'

export type GetAccountReq = Pick<Account, 'id'>
export type GetAccountResp = Account

export type GetAccountsReq = PaginationReq & {
  type?: CurrencyType[]
}
export type GetAccountsResp = Account[]

export type NewAccountReq = Pick<Account, 'type'>
export type NewAccountResp = Account

export type CloseAccountReq = Pick<Account, 'id'>
export type CloseAccountResp = void

export type DepositReq = {
  id: string
  moneyAmount: number
  message?: string
}
export type DepositResp = void

export type WithdrawReq = {
  id: string
  moneyAmount: number
  message?: string
}
export type WithdrawResp = void
