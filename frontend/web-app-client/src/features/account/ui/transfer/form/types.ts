import { Account } from 'entities/account'

export type TransferFormProps = {
  isLoading: boolean
  type: 'self' | 'external' | 'withdraw' | 'deposit'
  onFinish: (values: TransferFormValues) => Promise<void>
  account: Account
}

export type TransferFormValues = {
  accountId: string
  fromAccountId?: string
  toAccountId?: string
  amount: number
  message?: string
  userId?: string
}
