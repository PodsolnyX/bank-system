import { CurrencyType } from 'entities/Currency'

export type RequestLoanDto = {
  AccountId: string
  TariffId: string
  Amount: number
  CurrencyType: CurrencyType
}
