import { CurrencyType } from 'entities/Currency'

export type SearchLoanUserDto = {
  Account: string[]
  CurrencyType: CurrencyType[]
}
