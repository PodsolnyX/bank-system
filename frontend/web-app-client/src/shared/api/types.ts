import { IDEMPOTENCY_KEY } from "shared/api/key"

export type PaginationReq = {
  offset?: number | null
  limit?: number | null
  orderBy?: string | null
  sortOrder?: SortOrder | null
}

export enum SortOrder {
  ASC,
  DESC,
}

export type WithKey<T> = T & {
  [IDEMPOTENCY_KEY]: string
}
