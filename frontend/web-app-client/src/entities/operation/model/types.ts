export enum OperationType {
  WITHDRAW,
  DEPOSIT,
  REPAYMENT,
}

export type Operation = {
  id: string
  type: OperationType
  amount: number
}
