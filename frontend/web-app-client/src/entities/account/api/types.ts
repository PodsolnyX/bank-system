import { PaginationReq } from 'shared/api'
import { CurrencyType } from 'shared/lib'
import { Account } from '../model'

export type GetAccountReq = Pick<Account, 'id'>
export type GetAccountResp = Account

export type GetAccountsReq = PaginationReq & {
  hidden?: boolean
  currencyTypes?: CurrencyType[]
}
export type GetAccountsResp = Account[]
