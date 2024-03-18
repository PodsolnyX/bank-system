import { HeaderName } from 'config/Auth'

export type WithUser<T> = T & {
  authId: string
}
