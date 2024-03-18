import { boolstr } from 'common'
import { CurrencyType } from 'entities/Currency'

export type SearchAccountDto = {
  hidden?: boolstr
  currencyTypes?: CurrencyType[]
}
