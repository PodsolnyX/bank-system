import { createApi } from '@reduxjs/toolkit/query/react'
import { API_USER } from 'shared/config'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuth({ baseUrl: API_USER, credentials: 'include' }),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
