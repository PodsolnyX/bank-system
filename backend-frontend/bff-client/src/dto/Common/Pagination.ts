export type PaginationReq<T> = {
  Offset?: number
  Limit?: number
  OrderBy?: string
  SortOrder?: SortOrder
} & T

export enum SortOrder {
  Asc,
  Desc,
}
