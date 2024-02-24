export enum OperationType {
  DEPOSIT,
  WITHDRAW,
  LOAN_CHARGE,
  LOAN_INCOME,
}

export enum OperationStatus {
  SUCCESS,
  FAILURE,
  PROCESSING,
}

export type Operation = {
  id: string
  accountId: string
  loadId?: string
  type: OperationType
  status: OperationStatus
  amount: number
  date: string
  message?: string
}
