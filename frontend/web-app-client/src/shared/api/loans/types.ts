import { CurrencyType, Loan, PaginationReq, Payment } from 'shared/entities'

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

export type GetPaymentsReq = {
  loanIds?: string[] | null
  onlyActual?: boolean | null
}
export type GetPaymentsResp = Payment[]
