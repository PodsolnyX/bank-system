export type PaginationReq = {
  offset?: number
  limit?: number
  orderBy?: string
  sortOrder?: SortOrder
}

export enum SortOrder {
  ASC,
  DESC,
}
