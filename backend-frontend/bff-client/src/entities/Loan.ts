import { CurrencyType } from 'entities/Currency'
import { Tariff } from 'entities/Tariff'

export type Loan = {
  id: string
  userId: string
  accountId: string
  tariff: Tariff
  lastChargeDate?: string | null
  currencyType: CurrencyType
  debt: number
  isClosed: boolean
}
