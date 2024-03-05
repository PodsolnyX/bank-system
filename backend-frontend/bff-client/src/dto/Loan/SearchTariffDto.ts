import { CurrencyType } from 'entities/Currency'

export type SearchTariffDto = {
  Name?: string
  PeriodInDays?: number
  InterestRate?: number
  CurrencyTypes?: CurrencyType[]
}
