import { Account } from 'entities/account'
import { WithKey } from 'shared/api'

export type NewAccountReq = WithKey<Pick<Account, 'currencyType'>>
export type NewAccountResp = Account

export type CloseAccountReq = {
  accountId: string
}

export type CloseAccountResp = void

export type DepositReq = WithKey<{
  accountId: string
  amount: number
  message?: string
}>
export type DepositResp = void

export type WithdrawReq = WithKey<{
  accountId: string
  amount: number
  message?: string
}>
export type WithdrawResp = void

export type TransferSelfReq = WithKey<{
  fromAccountId: string
  toAccountId: string
  amount: number
}>
export type TransferSelfResp = void

export type TransferUserReq = WithKey<{
  fromAccountId: string
  userId: string
  amount: number
}>
export type TransferUserResp = void

export type MakePriorityReq = WithKey<{
  accountId: string
}>
export type MakePriorityResp = void
