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
} from './types'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ACCOUNTS }),
  endpoints: (builder) => ({
    getAccounts: builder.query<GetAccountsResp, GetAccountsReq>({
      query: () => ({ url: '' }),
    }),
    getAccount: builder.query<GetAccountResp, GetAccountReq>({
      query: ({ id }) => ({ url: `/${id}` }),
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

export const { useGetAccountsQuery, useNewAccountMutation, useCloseAccountMutation } =
  accountsApi
