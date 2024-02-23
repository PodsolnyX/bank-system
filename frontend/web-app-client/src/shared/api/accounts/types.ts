import { Account, Operation } from 'shared/entities'

export type GetAccountReq = Pick<Account, 'id'>
export type GetAccountResp = Account

export type GetAccountsReq = void
export type GetAccountsResp = Account[]

export type GetAccountsHistoryReq = void
export type GetAccountsHistoryResp = Operation[]

export type GetAccountHistoryReq = Pick<Account, 'id'>
export type GetAccountHistoryResp = Operation[]

export type NewAccountReq = Pick<Account, 'balance'>
export type NewAccountResp = Account

export type CloseAccountReq = Pick<Account, 'id'>
export type CloseAccountResp = {
  result: boolean
}
