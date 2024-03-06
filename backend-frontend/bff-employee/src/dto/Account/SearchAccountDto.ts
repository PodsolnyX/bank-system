import { CurrencyType } from 'entities/Currency'

export type SearchAccountDto = {
  currencyTypes?: CurrencyType[],
  userIds?: string[]
}
