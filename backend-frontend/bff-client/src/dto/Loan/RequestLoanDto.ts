import { CurrencyType } from 'entities/Currency'

export type RequestLoanDto = {
  accountId: string
  TariffId: string
  amount: number
  CurrencyType: CurrencyType
}
