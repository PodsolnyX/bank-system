import { CurrencyType } from 'shared/entities/currency'

export enum OperationType {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw',
  LOAN_CHARGE = 'LoanCharge',
  LOAN_INCOME = 'LoanIncome',
}

export enum OperationStatus {
  SUCCESS,
  FAILURE,
  PROCESSING,
}

export type Operation = {
  accountId: string
  amount: number
  currencyType: CurrencyType
  id: string
  loanId?: string
  message?: string
  status: OperationStatus
  type: OperationType
  date: string
}
