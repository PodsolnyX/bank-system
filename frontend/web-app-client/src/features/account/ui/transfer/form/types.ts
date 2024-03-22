import { Account } from 'entities/account'

export type TransferFormProps = {
  isLoading: boolean
  type: 'self' | 'external'
  onFinish: (values: TransferFormValues) => void
  account: Account
}

export type TransferFormValues = {
  accountId: string
  amount: number
  message?: string
}
