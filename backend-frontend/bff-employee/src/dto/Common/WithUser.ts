import { CookieName } from 'config/Auth'

export type WithUser<T> = T & {
  [CookieName]: string
}
