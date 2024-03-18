import { createApi } from '@reduxjs/toolkit/query/react'
import { GetHistoryReq, GetHistoryResp } from 'shared/api'
import { API_OPERATIONS } from 'shared/config'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_OPERATIONS, credentials: 'include' }),
  endpoints: (builder) => ({
    getHistory: builder.query<GetHistoryResp, GetHistoryReq>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useGetHistoryQuery } = operationsApi
