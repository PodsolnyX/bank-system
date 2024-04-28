import { accountsApi } from 'shared/api'
import { TOKEN_LS_NAME } from 'shared/config'
import {
  GetAccountsReq,
  GetAccountsResp,
  GetAccountReq,
  GetAccountResp,
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
  }),
})

export const {
  useGetAccountQuery,
  useGetAccountsQuery,
} = endpoints
