import { Tariff } from 'entities/tariff/@x/loan'
import { CurrencyType } from 'shared/lib'

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
