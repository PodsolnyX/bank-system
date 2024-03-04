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
  DepositResp,
  DepositReq,
  WithdrawResp,
  WithdrawReq,
} from './types'

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ACCOUNTS, credentials: 'include' }),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAccounts: builder.query<GetAccountsResp, GetAccountsReq>({
      query: () => ({ url: '/accounts' }),
    }),
    getAccount: builder.query<GetAccountResp, GetAccountReq>({
      query: ({ id }) => ({ url: `/${id}` }),
    }),
    newAccount: builder.mutation<NewAccountResp, NewAccountReq>({
      query: (body) => ({
        url: '/open',
        method: 'POST',
        body,
      }),
    }),
    closeAccount: builder.mutation<CloseAccountResp, CloseAccountReq>({
      query: (body) => ({
        url: '/close',
        method: 'DELETE',
        body,
      }),
    }),
    deposit: builder.mutation<DepositResp, DepositReq>({
      query: (body) => ({
        url: '/deposit',
        method: 'POST',
        body,
      }),
    }),
    withdraw: builder.mutation<WithdrawResp, WithdrawReq>({
      query: (body) => ({
        url: '/withdraw',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetAccountQuery,
  useGetAccountsQuery,
  useNewAccountMutation,
  useCloseAccountMutation,
  useDepositMutation,
  useWithdrawMutation,
} = accountsApi
