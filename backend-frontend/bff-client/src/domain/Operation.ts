export enum OperationType {
  Deposit,
  Withdraw,
  LoanCharge,
  LoanIncome,
}

export enum OperationStatus {
  Success,
  Failure,
  Processing,
}

export type Operation = {
  Id: string
  AccountId: string
  LoanId?: string
  Type: OperationType
  Status: OperationStatus
  Amount: number
  Date: string
  Message?: string
}
