import { Account } from 'shared/entities'

export type GetAccountReq = Pick<Account, 'id'>
export type GetAccountResp = Account

export type GetAccountsReq = void
export type GetAccountsResp = Account[]

export type NewAccountReq = Pick<Account, 'balance'>
export type NewAccountResp = Account

export type CloseAccountReq = Pick<Account, 'id'>
export type CloseAccountResp = {
  result: boolean
}
