import { CurrencyType } from 'entities/Currency'

export type ChargeLoanDto = {
  accountId: string
  amount: number
  CurrencyType: CurrencyType
}
