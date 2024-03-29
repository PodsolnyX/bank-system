import { CurrencyType } from 'entities/Currency'
import { OperationStatus, OperationType } from 'entities/Operation'

export type SearchOperationUserDto = {
  UserIds?: string[]
  AccountIds?: string[]
  LoanIds?: string[]
  CurrencyTypes?: CurrencyType[]
  OperationTypes?: OperationType[]
  OperationStatuses?: OperationStatus[]
}
