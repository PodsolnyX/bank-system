import { CurrencyType } from 'entities/Currency'

export type SearchLoanUserDto = {
  AccountIds: string[]
  CurrencyTypes: CurrencyType[]
}
