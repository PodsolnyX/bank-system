import { Operation, OperationStatus, OperationType, PaginationReq } from 'shared/entities'

export type GetHistoryReq = PaginationReq & {
  account?: string[]
  loan?: string[]
  type: OperationType[]
  status: OperationStatus[]
}

export type GetHistoryResp = Operation[]
