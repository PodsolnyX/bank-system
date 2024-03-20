import { GetHistoryReq, GetHistoryResp } from './types'
import { operationsApi } from 'shared/api'

const endpoints = operationsApi.injectEndpoints({
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

export const { useGetHistoryQuery } = endpoints
