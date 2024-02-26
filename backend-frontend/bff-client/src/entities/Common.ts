export type PaginationReq = {
  Offset?: number
  Limit?: number
  OrderBy?: string
  SortOrder?: SortOrder
}

export enum SortOrder {
  Asc,
  Desc,
}
