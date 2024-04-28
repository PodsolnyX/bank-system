import { createApi } from '@reduxjs/toolkit/query/react'
import { API_LOANS } from 'shared/config'

import { staggeredBaseQuery } from '../baseQueryWithAuth'

export const loansApi = createApi({
  reducerPath: 'loansApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: staggeredBaseQuery({ baseUrl: API_LOANS, credentials: 'include' }),
  endpoints: () => ({}),
})
