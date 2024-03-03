import { CurrencyType } from 'entities/Currency'

export type Tariff = {
  id: string
  name: string
  periodInDays: number
  interestRate: number
  currencyTypes: CurrencyType[]
}
