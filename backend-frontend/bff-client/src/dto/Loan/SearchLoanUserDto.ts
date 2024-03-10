import { CurrencyType } from 'entities/Currency'

export type SearchLoanUserDto = {
  accountIds: string[]
  CurrencyTypes: CurrencyType[]
}
