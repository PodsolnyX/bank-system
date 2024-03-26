import { accountsApi } from 'shared/api'
import {
  CloseAccountReq,
  CloseAccountResp,
  NewAccountReq,
  NewAccountResp,
  DepositResp,
  DepositReq,
  WithdrawResp,
  WithdrawReq,
  TransferSelfResp,
  TransferSelfReq,
  TransferUserResp,
  TransferUserReq,
} from './types'

export const endpoints = accountsApi.injectEndpoints({
  endpoints: (builder) => ({
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
    transferSelf: builder.mutation<TransferSelfResp, TransferSelfReq>({
      query: (data) => ({
        url: `/${data.fromAccountId}/transfer/${data.toAccountId}`,
        method: 'POST',
        params: {
          amount: data.amount,
        },
      }),
    }),
    transferUser: builder.mutation<TransferUserResp, TransferUserReq>({
      query: (data) => ({
        url: `/${data.fromAccountId}/transfer/${data.userId}`,
        method: 'POST',
        params: {
          amount: data.amount,
        },
      }),
    }),
  }),
})

export const {
  useNewAccountMutation,
  useCloseAccountMutation,
  useDepositMutation,
  useWithdrawMutation,
  useTransferSelfMutation,
  useTransferUserMutation
} = endpoints
