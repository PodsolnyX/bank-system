import { CurrencyType } from 'shared/entities/currency'

export type Tariff = {
  id: string
  name: string
  periodInDays: number
  interestRate: number
  currencyTypes: CurrencyType[]
}
