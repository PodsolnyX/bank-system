export type Pagination<T> = {
  Offset?: number
  Limit?: number
  OrderBy?: string
  SortOrder?: SortOrder
} & T

export enum SortOrder {
  Asc,
  Desc,
}
