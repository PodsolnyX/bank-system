import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_PREFERENCES, credentials: 'include' }),
  tagTypes: ['Theme', 'HiddenAccounts'],
  endpoints: (builder) => ({
    getPreferences: builder.query<GetPreferencesResp, GetPreferencesReq>({
      query: () => ({
        url: '/',
      }),
      providesTags: ['Theme', 'HiddenAccounts'],
    }),
    getTheme: builder.query<GetPreferencesResp, GetPreferencesReq>({
      query: () => ({
        url: '/theme',
      }),
      providesTags: ['Theme'],
    }),
    getHiddenAccounts: builder.query<GetPreferencesResp, GetPreferencesReq>({
      query: () => ({
        url: '/accounts',
      }),
      providesTags: ['HiddenAccounts'],
    }),
    updateTheme: builder.mutation<UpdateThemeResp, UpdateThemeReq>({
      query: (body) => ({
        url: '/theme',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Theme'],
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
      invalidatesTags: ['HiddenAccounts'],
    }),
    showAccount: builder.mutation<ShowAccountResp, ShowAccountReq>({
      query: (body) => ({
        url: '/account/show',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['HiddenAccounts'],
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
