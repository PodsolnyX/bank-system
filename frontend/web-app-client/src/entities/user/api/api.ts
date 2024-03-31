import { userApi } from 'shared/api'
import { GetAccessInfoResp, GetAccountsInfoReq } from './types'

export const endpoints = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccessInfo: builder.query<GetAccessInfoResp, GetAccountsInfoReq>({
      query: ({ userid }) => ({ url: `/${userid}` }),
    }),
  }),
})

export const { useGetAccessInfoQuery } = endpoints
