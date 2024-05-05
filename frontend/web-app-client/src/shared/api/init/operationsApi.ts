import { createApi } from '@reduxjs/toolkit/query/react'
import { API_OPERATIONS } from 'shared/config'

import { staggeredBaseQuery } from '../baseQueryWithAuth'

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: staggeredBaseQuery({ baseUrl: API_OPERATIONS, credentials: 'include' }),
  endpoints: () => ({}),
  tagTypes: ['history'],
})
