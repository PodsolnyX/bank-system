import { createApi } from '@reduxjs/toolkit/query/react'
import { API_TARIFFS } from 'shared/config'

import { staggeredBaseQuery } from '../baseQueryWithAuth'

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: staggeredBaseQuery({ baseUrl: API_TARIFFS, credentials: 'include' }),
  endpoints: () => ({}),
})
