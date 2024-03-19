export type WithUser<T> = T & {
  authId: string
}
