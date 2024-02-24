import { CurrencyType } from 'shared/entities/currency'

export type Account = {
  id: string
  user: string
  type: CurrencyType
  amount: number
  closedAt?: string
}
