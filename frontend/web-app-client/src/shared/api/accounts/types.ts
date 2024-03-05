import { Account, CurrencyType, PaginationReq } from 'shared/entities'

export type GetAccountReq = Pick<Account, 'id'>
export type GetAccountResp = Account

export type GetAccountsReq = PaginationReq & {
  currencyTypes?: CurrencyType[]
}
export type GetAccountsResp = Account[]

export type NewAccountReq = Pick<Account, 'currencyType'>
export type NewAccountResp = Account

export type CloseAccountReq = {
  AccountId: string
}

export type CloseAccountResp = void

export type DepositReq = {
  AccountId: string
  Amount: number
  Message?: string
}
export type DepositResp = void

export type WithdrawReq = {
  AccountId: string
  Amount: number
  Message?: string
}
export type WithdrawResp = void
