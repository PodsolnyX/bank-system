import { CurrencyType, Loan, PaginationReq } from 'shared/entities'

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

export type GetLoansReq = PaginationReq & {
  accountIds?: string[]
  currencyTypes?: CurrencyType[]
}
export type GetLoansResp = Loan[]

export type GetLoanReq = Pick<Loan, 'id'>
export type GetLoanResp = Loan
