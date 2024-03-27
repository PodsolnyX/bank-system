import { accountsApi } from 'shared/api'
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

export const endpoints = accountsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<GetAccountsResp, GetAccountsReq>({
      query: (params) => ({ url: '/', params }),
      providesTags: ['accounts']
    }),
    getAccount: builder.query<GetAccountResp, GetAccountReq>({
      query: ({ id }) => ({ url: `/${id}` }),
      providesTags: ['account']
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
} = endpoints
