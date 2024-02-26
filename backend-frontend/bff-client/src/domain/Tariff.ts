import { CurrencyType } from 'domain'

export type Tariff = {
  Id: string
  Name: string
  PeriodInDays: number
  InterestRate: number
  CurrencyTypes: CurrencyType[]
}
