import { PaginationReq } from 'shared/api'
import { CurrencyType } from 'shared/lib'
import { Operation, OperationStatus, OperationType } from '../model'

export type GetHistoryReq = PaginationReq & {
  accountIds?: string[]
  loanIds?: string[]
  CurrencyTypes?: CurrencyType[]
  OperationTypes?: OperationType[]
  OperationStatuses?: OperationStatus[]
}

export type GetHistoryResp = Operation[]
