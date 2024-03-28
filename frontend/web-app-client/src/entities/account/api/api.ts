import { accountsApi } from 'shared/api'
import { TOKEN_LS_NAME } from 'shared/config'
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
      providesTags: ['accounts'],
      async onCacheEntryAdded(_arg, api) {
        const baseURL = `ws://localhost:8080/history?token=${localStorage.getItem(TOKEN_LS_NAME)}`
        const ws = new WebSocket(baseURL)
        try {
          await api.cacheDataLoaded

          const listener = () => {
            const tm = 500
            setTimeout(
              () => api.dispatch(endpoints.util.invalidateTags(['accounts'])),
              tm * 1.5
            )
            setTimeout(
              () => api.dispatch(endpoints.util.invalidateTags(['accounts'])),
              tm * 4
            )
          }

          ws.addEventListener('message', listener)
        } catch {
          /* empty */
        }
        await api.cacheEntryRemoved
        ws.close()
      },
    }),
    getAccount: builder.query<GetAccountResp, GetAccountReq>({
      query: ({ id }) => ({ url: `/${id}` }),
      providesTags: ['account'],
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
