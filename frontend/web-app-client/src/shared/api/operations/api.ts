import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetHistoryReq, GetHistoryResp } from 'shared/api'
import { API_OPERATIONS } from 'shared/config'

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: API_OPERATIONS, credentials: "include" }),
  endpoints: (builder) => ({
    getHistory: builder.query<GetHistoryResp, GetHistoryReq>({
      query: (body) => ({
        url: '',
        method: 'GET',
        body,
      }),
    }),
  }),
})

export const { useGetHistoryQuery } = operationsApi
