import { WithKey } from 'shared/api'
import { CurrencyType } from 'shared/lib'

export type RequestLoanReq = WithKey<{
  accountId: string
  tariffId: string
  amount: number
  currencyType: CurrencyType
}>
export type RequestLoanResp = void

export type ChargeLoanReq = WithKey<{
  loanId: string
  accountId: string
  amount: number
  currencyType: CurrencyType
}>
export type ChargeLoanResp = void
