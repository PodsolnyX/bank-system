import { CurrencyType } from 'entities/Currency'
import { Tariff } from 'entities/Tariff'

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
