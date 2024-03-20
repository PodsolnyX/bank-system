import { operationsApi } from 'shared/api'
import { GetHistoryReq, GetHistoryResp } from './types'

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
