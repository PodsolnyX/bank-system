import { Account, OperationType } from 'shared/entities'

export type TransferFormProps = {
  isLoading: boolean
  type: OperationType.DEPOSIT | OperationType.WITHDRAW
  onFinish: (values: TransferFormValues) => void
  account: Account
}

export type TransferFormValues = {
  accountId: string
  amount: number
  message?: string
}
