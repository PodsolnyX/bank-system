import { CurrencyType } from 'shared/lib'

export type Tariff = {
  id: string
  name: string
  periodInDays: number
  interestRate: number
  currencyTypes: CurrencyType[]
}
