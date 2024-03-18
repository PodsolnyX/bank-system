import { createApi } from '@reduxjs/toolkit/query/react'
import { API_PREFERENCES } from 'shared/config'
import {
  GetPreferencesReq,
  GetPreferencesResp,
  UpdateThemeReq,
  UpdateThemeResp,
  HideAccountReq,
  HideAccountResp,
  ShowAccountReq,
  ShowAccountResp,
} from './types'

import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: baseQueryWithAuth({ baseUrl: API_PREFERENCES, credentials: 'include' }),
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
    updateTheme: builder.mutation<UpdateThemeResp, UpdateThemeReq>({
      query: (body) => ({
        url: '/theme',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: updatedTheme } = await queryFulfilled
        dispatch(
          preferencesApi.util.updateQueryData('getTheme', undefined, (draft) => {
            Object.assign(draft, updatedTheme)
          })
        )
      },
    }),
    hideAccount: builder.mutation<HideAccountResp, HideAccountReq>({
      query: (body) => ({
        url: '/account/hide',
        method: 'PUT',
        body,
      }),
    }),
    showAccount: builder.mutation<ShowAccountResp, ShowAccountReq>({
      query: (body) => ({
        url: '/account/show',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const {
  useGetPreferencesQuery,
  useGetThemeQuery,
  useGetHiddenAccountsQuery,
  useUpdateThemeMutation,
  useHideAccountMutation,
  useShowAccountMutation,
} = preferencesApi
