import { CurrencyType } from 'shared/lib'

export type Account = {
  id: string
  userId: string
  currencyType: CurrencyType
  amount: number
  closedAt?: string | null
  hidden: boolean
  isPriority: boolean
}
