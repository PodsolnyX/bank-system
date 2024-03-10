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
