import { CurrencyType } from 'shared/lib'

export enum OperationType {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw',
}

export enum OperationReason {
  CASH = 'Cash',
  LOAN = 'Loan',
}

export enum OperationStatus {
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  PROCESSING = 'Processing',
}

export type Operation = {
  id: string
  accountId: string
  loanId?: string | null
  type: OperationType
  reason: OperationReason
  status: OperationStatus
  currencyType: CurrencyType
  amount: number
  message?: string | null
  createdAt?: string | null
}
