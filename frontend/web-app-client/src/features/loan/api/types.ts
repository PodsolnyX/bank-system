import { CurrencyType } from 'shared/lib'

export type RequestLoanReq = {
  accountId: string
  tariffId: string
  amount: number
  currencyType: CurrencyType
}
export type RequestLoanResp = void

export type ChargeLoanReq = {
  loanId: string
  accountId: string
  amount: number
  currencyType: CurrencyType
}
export type ChargeLoanResp = void
