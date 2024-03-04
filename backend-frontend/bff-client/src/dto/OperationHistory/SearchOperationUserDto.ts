import { OperationStatus, OperationType } from 'entities/Operation'

export type SearchOperationUserDto = {
  AccountIds?: string[]
  LoanIds?: string[]
  Type?: OperationType[]
  Status?: OperationStatus[]
}
