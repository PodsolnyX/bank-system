import { CurrencyType } from 'entities/Currency'

export type Tariff = {
  Id: string
  Name: string
  PeriodInDays: number
  InterestRate: number
  CurrencyTypes: CurrencyType[]
}
