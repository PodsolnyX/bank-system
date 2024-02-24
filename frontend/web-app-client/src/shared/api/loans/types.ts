import { CurrencyType, Loan, PaginationReq, Tariff } from 'shared/entities'

export type RequestLoanReq = {
  accountId: string
  tariffId: string
  moneyAmount: number
  currencyType: CurrencyType
}
export type RequestLoanResp = void

export type ChargeLoanReq = {
  loanId: string
  accountId: string
  moneyAmount: number
  currencyType: CurrencyType
}
export type ChargeLoanResp = void

export type GetTariffsReq = PaginationReq & {
  name?: string
  periodInDays?: number
  interestRate?: number
  currencyType?: string
}
export type GetTariffsResp = Tariff[]

export type GetLoansReq = PaginationReq & {
  account?: string[]
  currencyType?: CurrencyType[]
}
export type GetLoansResp = Loan[]
