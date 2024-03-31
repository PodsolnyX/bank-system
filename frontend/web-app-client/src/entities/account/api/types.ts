import { PaginationReq } from 'shared/api'
import { CurrencyType } from 'shared/lib'
import { Account } from '../model'

export type GetAccountReq = Pick<Account, 'id'>
export type GetAccountResp = Account

export type GetAccountsReq = PaginationReq & {
  hidden?: boolean
  currencyTypes?: CurrencyType[]
}
export type GetAccountsResp = Account[]

export type NewAccountReq = Pick<Account, 'currencyType'>
export type NewAccountResp = Account

export type CloseAccountReq = {
  accountId: string
}

export type CloseAccountResp = void

export type DepositReq = {
  accountId: string
  amount: number
  message?: string
}
export type DepositResp = void

export type WithdrawReq = {
  accountId: string
  amount: number
  message?: string
}
export type WithdrawResp = void
