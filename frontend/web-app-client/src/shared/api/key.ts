import { QueryStatus } from '@reduxjs/toolkit/query'
import { useRef } from 'react'

export const IDEMPOTENCY_KEY = 'key'
export const KEY_HEADER = 'x-key'

export const rmKey = <T extends object>(obj: T): Omit<T, 'key'> => {
  const newObj = { ...obj }
  if (IDEMPOTENCY_KEY in newObj) {
    delete newObj[IDEMPOTENCY_KEY]
  }
  return newObj
}

export const getKey = (obj: Record<any, any>) => ({
  [KEY_HEADER]: obj[IDEMPOTENCY_KEY],
})



export const useKey = (status: QueryStatus) => {
  const id = useRef(self.crypto.randomUUID())
  if (status === QueryStatus.rejected) {
    id.current = self.crypto.randomUUID()
  }
  return {
    [IDEMPOTENCY_KEY]: id.current
  }
}
