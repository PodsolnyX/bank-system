import { accountsApi, operationsApi } from 'shared/api'
import { TOKEN_LS_NAME } from 'shared/config'
import { GetHistoryReq, GetHistoryResp } from './types'

const endpoints = operationsApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query<GetHistoryResp, GetHistoryReq>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
      providesTags: ['history'],
      async onCacheEntryAdded(arg, api) {
        let baseURL = `ws://localhost:8080/history?token=${localStorage.getItem(TOKEN_LS_NAME)}`
        if (arg.accountIds?.length === 1) {
          baseURL = baseURL.concat(`&accountId=${arg.accountIds[0]}`)
        }
        const ws = new WebSocket(baseURL)
        try {
          await api.cacheDataLoaded

          const listener = () => {
            const tm = 500
            setTimeout(() => api.dispatch(endpoints.util.invalidateTags(['history'])), tm)
            setTimeout(
              () => api.dispatch(accountsApi.util.invalidateTags(['account'])),
              tm * 1.5
            )
            setTimeout(
              () => api.dispatch(accountsApi.util.invalidateTags(['account'])),
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
  }),
})

export const { useGetHistoryQuery } = endpoints
