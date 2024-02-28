export type WithUser<T> = T & {
  Authorization: string
}
