import { Operation, OperationStatus, OperationType, PaginationReq } from 'shared/entities'

export type GetHistoryReq = PaginationReq & {
  AccountIds?: string[]
  LoanIds?: string[]
  type?: OperationType[]
  status?: OperationStatus[]
}

export type GetHistoryResp = Operation[]
