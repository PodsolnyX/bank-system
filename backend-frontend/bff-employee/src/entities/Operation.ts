import {CurrencyType} from "./Currency";

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
  id: string
  accountId: string
  loanId?: string
  type: OperationType
  status: OperationStatus
  amount: number
  date: string
  message?: string
  currencyType: CurrencyType
}
