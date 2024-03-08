import { CurrencyType, Tariff } from 'shared/entities'

export type Loan = {
  id: string
  userId: string
  accountId: string
  tariff: Tariff
  lastChargeDate?: string | null
  currencyType: CurrencyType
  debt: number
}
