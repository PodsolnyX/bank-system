import { CurrencyType } from 'entities/Currency'

export type ChargeLoanDto = {
  AccountId: string
  Amount: number
  CurrencyType: CurrencyType
}
