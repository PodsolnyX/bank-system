import { createApi } from '@reduxjs/toolkit/query/react'
import { API_OPERATIONS } from 'shared/config'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_OPERATIONS, credentials: 'include' }),
  endpoints: () => ({}),
})
