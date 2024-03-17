import { CurrencyType } from 'shared/entities/currency'

export type Account = {
  id: string
  userId: string
  currencyType: CurrencyType
  amount: number
  closedAt?: string | null
  hidden: boolean
}
