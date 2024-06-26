import { accountsApi, getKey, rmKey } from 'shared/api'
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
  MakePriorityResp,
  MakePriorityReq,
} from './types'

export const endpoints = accountsApi.injectEndpoints({
  endpoints: (builder) => ({
    newAccount: builder.mutation<NewAccountResp, NewAccountReq>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        params: rmKey(params),
        headers: getKey(params)
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
        headers: getKey(data)
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
        headers: getKey(data)
      }),
    }),
    transferSelf: builder.mutation<TransferSelfResp, TransferSelfReq>({
      query: (data) => ({
        url: `/${data.fromAccountId}/transfer/${data.toAccountId}`,
        method: 'POST',
        params: {
          amount: data.amount,
        },
        headers: getKey(data)
      }),
    }),
    transferUser: builder.mutation<TransferUserResp, TransferUserReq>({
      query: (data) => ({
        url: `/${data.fromAccountId}/transfer/${data.userId}/toUser`,
        method: 'POST',
        params: {
          amount: data.amount,
        },
        headers: getKey(data)
      }),
    }),
    makePriority: builder.mutation<MakePriorityResp, MakePriorityReq>({
      query: (data) => ({
        url: `/${data.accountId}/priority`,
        method: 'POST',
        headers: getKey(data)
      }),
      invalidatesTags: ['account', 'accounts'],
    }),
  }),
})

export const {
  useNewAccountMutation,
  useCloseAccountMutation,
  useDepositMutation,
  useWithdrawMutation,
  useTransferSelfMutation,
  useTransferUserMutation,
  useMakePriorityMutation,
} = endpoints
