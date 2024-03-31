import { createApi } from '@reduxjs/toolkit/query/react'
import { API_PREFERENCES } from 'shared/config'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: baseQueryWithAuth({ baseUrl: API_PREFERENCES, credentials: 'include' }),
  endpoints: () => ({}),
})
