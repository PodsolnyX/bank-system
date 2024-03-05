import {
  CurrencyType,
  Operation,
  OperationStatus,
  OperationType,
  PaginationReq,
} from 'shared/entities'

export type GetHistoryReq = PaginationReq & {
  AccountIds?: string[]
  LoanIds?: string[]
  CurrencyTypes?: CurrencyType[]
  OperationTypes?: OperationType[]
  OperationStatuses?: OperationStatus[]
}

export type GetHistoryResp = Operation[]
