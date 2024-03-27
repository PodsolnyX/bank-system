import { Account } from 'entities/account'

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

export type TransferSelfReq = {
  fromAccountId: string
  toAccountId: string
  amount: number
}
export type TransferSelfResp = void

export type TransferUserReq = {
  fromAccountId: string
  userId: string
  amount: number
}
export type TransferUserResp = void

export type MakePriorityReq = {
  accountId: string
}
export type MakePriorityResp = void
