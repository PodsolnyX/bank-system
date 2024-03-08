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
      query: (params) => ({ url: '/', params }),
    }),
    getAccount: builder.query<GetAccountResp, GetAccountReq>({
      query: ({ id }) => ({ url: `/${id}` }),
    }),
    newAccount: builder.mutation<NewAccountResp, NewAccountReq>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        params,
      }),
    }),
    closeAccount: builder.mutation<CloseAccountResp, CloseAccountReq>({
      query: ({ accountId }) => ({
        url: `/${accountId}`,
        method: 'DELETE',
      }),
    }),
    deposit: builder.mutation<DepositResp, DepositReq>({
      query: (data) => ({
        url: `/${data.accountId}/deposit`,
        method: 'POST',
        params: {
          amount: data.amount,
          message: data.message,
        },
      }),
    }),
    withdraw: builder.mutation<WithdrawResp, WithdrawReq>({
      query: (data) => ({
        url: `/${data.accountId}/withdraw`,
        method: 'POST',
        params: {
          amount: data.amount,
          message: data.message,
        },
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
