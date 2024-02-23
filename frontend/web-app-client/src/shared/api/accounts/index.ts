import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_ACCOUNTS } from 'shared/config'
import {
  CloseAccountReq,
  CloseAccountResp,
  GetAccountsReq,
  GetAccountsResp,
  GetAccountReq,
  GetAccountResp,
  NewAccountReq,
  NewAccountResp,
  GetAccountsHistoryReq,
  GetAccountsHistoryResp,
  GetAccountHistoryResp,
  GetAccountHistoryReq,
} from './types'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ACCOUNTS }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getAccounts: builder.query<GetAccountsResp, GetAccountsReq>({
      query: () => ({ url: '' }),
    }),
    getAccount: builder.query<GetAccountResp, GetAccountReq>({
      query: ({ id }) => ({ url: `/${id}` }),
    }),
    getAccountsHistory: builder.query<GetAccountsHistoryResp, GetAccountsHistoryReq>({
      query: () => ({ url: '/history' }),
    }),
    getAccountHistory: builder.query<GetAccountHistoryResp, GetAccountHistoryReq>({
      query: ({ id }) => ({ url: `/${id}/history` }),
    }),
    newAccount: builder.mutation<NewAccountResp, NewAccountReq>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    closeAccount: builder.mutation<CloseAccountResp, CloseAccountReq>({
      query: ({ id }) => ({
        url: `/close/${id}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetAccountHistoryQuery,
  useGetAccountsHistoryQuery,
  useGetAccountQuery,
  useGetAccountsQuery,
  useNewAccountMutation,
  useCloseAccountMutation,
} = accountsApi
