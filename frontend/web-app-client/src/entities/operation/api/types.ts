import { Operation, OperationStatus, OperationType } from '../model'
import { CurrencyType } from 'shared/lib'
import { PaginationReq } from 'shared/api'

export type GetHistoryReq = PaginationReq & {
  accountIds?: string[]
  loanIds?: string[]
  CurrencyTypes?: CurrencyType[]
  OperationTypes?: OperationType[]
  OperationStatuses?: OperationStatus[]
}

export type GetHistoryResp = Operation[]
