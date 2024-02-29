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
    deposit: builder.mutation<DepositResp, DepositReq>({
      query: ({ id, moneyAmount, message }) => ({
        url: `/${id}/deposit`,
        method: 'POST',
        body: {
          moneyAmount,
          message,
        },
      }),
    }),
    withdraw: builder.mutation<WithdrawResp, WithdrawReq>({
      query: ({ id, moneyAmount, message }) => ({
        url: `/${id}/withdraw`,
        method: 'POST',
        body: {
          moneyAmount,
          message,
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
