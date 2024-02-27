import { CurrencyType } from 'entities/Currency'

export type ChargeLoanDto = {
  AccountId: string
  MoneyAmount: number
  CurrencyType: CurrencyType
}
