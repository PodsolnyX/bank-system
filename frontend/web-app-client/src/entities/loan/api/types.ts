import { Payment } from '../model'
import { CurrencyType } from 'shared/lib'
import { Loan } from '../model'
import { PaginationReq } from 'shared/api'

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
