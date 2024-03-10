import { CurrencyType } from "entities/Currency"

export enum OperationType {
  Deposit,
  Withdraw,
}

export enum OperationReason {
  Cash,
  Loan,
}

export enum OperationStatus {
  Success,
  Failure,
  Processing,
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
