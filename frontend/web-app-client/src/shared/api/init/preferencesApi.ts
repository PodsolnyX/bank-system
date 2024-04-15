import { createApi } from '@reduxjs/toolkit/query/react'
import { API_PREFERENCES } from 'shared/config'

import { staggeredBaseQuery } from '../baseQueryWithAuth'

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: staggeredBaseQuery({ baseUrl: API_PREFERENCES, credentials: 'include' }),
  endpoints: () => ({}),
})
