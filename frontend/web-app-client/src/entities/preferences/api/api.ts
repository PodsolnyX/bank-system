import { preferencesApi } from 'shared/api'
import {
  GetPreferencesReq,
  GetPreferencesResp,
} from './types'

export const preferencesQueryEndpoints = preferencesApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreferences: builder.query<GetPreferencesResp, GetPreferencesReq>({
      query: () => ({
        url: '/',
      }),
    }),
    getTheme: builder.query<GetPreferencesResp, GetPreferencesReq>({
      query: () => ({
        url: '/theme',
      }),
    }),
    getHiddenAccounts: builder.query<GetPreferencesResp, GetPreferencesReq>({
      query: () => ({
        url: '/accounts',
      }),
    }),
  }),
})

export const {
  useGetPreferencesQuery,
  useGetThemeQuery,
  useGetHiddenAccountsQuery,
} = preferencesQueryEndpoints
