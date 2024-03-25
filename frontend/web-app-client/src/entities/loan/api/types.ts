import { PaginationReq } from 'shared/api'
import { CurrencyType } from 'shared/lib'
import { Payment } from '../model'
import { Loan } from '../model'

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

export type GetRatingReq = void
export type GetRatingResp = {
  rating: number
}
