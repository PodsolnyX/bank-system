import { CurrencyType } from 'entities/Currency'

export type Account = {
  id: string
  userId: string
  currencyType: CurrencyType
  amount: number
  closedAt?: string | null
  isPriority: boolean
}

export type FullAccount = Account & {
  hidden: boolean
}
