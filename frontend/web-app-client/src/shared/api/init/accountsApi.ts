import { createApi } from '@reduxjs/toolkit/query/react'
import { API_ACCOUNTS } from 'shared/config'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: baseQueryWithAuth({ baseUrl: API_ACCOUNTS, credentials: 'include' }),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
