import { createApi } from '@reduxjs/toolkit/query/react'
import { API_TARIFFS } from 'shared/config'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_TARIFFS, credentials: 'include' }),
  endpoints: () => ({}),
})
