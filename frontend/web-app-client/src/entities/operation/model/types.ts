import { Credit, Account } from 'entities'

export enum OperationType {
  WITHDRAW,
  DEPOSIT,
  REPAYMENT,
}

export type Operation = {
  id: string
  type: OperationType
  date: string
  account: Pick<Account, 'id' | 'number'>
  credit?: Pick<Credit, 'id' | 'number'>
  amount: number
}
