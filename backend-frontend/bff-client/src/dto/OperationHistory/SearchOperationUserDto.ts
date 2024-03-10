import { CurrencyType } from 'entities/Currency'
import { OperationStatus, OperationType } from 'entities/Operation'

export type SearchOperationUserDto = {
  accountIds?: string[]
  loanIds?: string[]
  CurrencyTypes?: CurrencyType[]
  OperationTypes?: OperationType[]
  OperationStatuses?: OperationStatus[]
}
