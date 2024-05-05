import { createApi } from '@reduxjs/toolkit/query/react'
import { API_USER } from 'shared/config'

import { staggeredBaseQuery } from '../baseQueryWithAuth'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: staggeredBaseQuery({ baseUrl: API_USER, credentials: 'include' }),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
