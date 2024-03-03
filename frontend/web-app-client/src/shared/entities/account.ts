import { CurrencyType } from 'shared/entities/currency'

export type Account = {
  id: string
  user: string
  currencyType: CurrencyType
  amount: number
  closedAt?: string
}
