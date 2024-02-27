import { OperationStatus, OperationType } from 'entities/Operation'

export type SearchOperationUserDto = {
  Account?: string[]
  Loan?: string[]
  Type?: OperationType[]
  Status?: OperationStatus[]
}
