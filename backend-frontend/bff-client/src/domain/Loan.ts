import { CurrencyType, Tariff } from 'domain'

export type Loan = {
  Id: string
  UserId: string
  AccountId: string
  Tariff: Tariff
  LastChargeDate?: string
  CurrencyType: CurrencyType
  Sum: number
  Debt: number
}
