import { preferencesQueryEndpoints } from 'entities/preferences'
import { preferencesApi } from 'shared/api'
import {
  UpdateThemeReq,
  UpdateThemeResp,
  HideAccountReq,
  HideAccountResp,
  ShowAccountReq,
  ShowAccountResp,
} from './types'

const endpoints = preferencesApi.injectEndpoints({
  endpoints: (builder) => ({
    updateTheme: builder.mutation<UpdateThemeResp, UpdateThemeReq>({
      query: (body) => ({
        url: '/theme',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: updatedTheme } = await queryFulfilled
        dispatch(
          preferencesQueryEndpoints.util.updateQueryData(
            'getTheme',
            undefined,
            (draft) => {
              Object.assign(draft, updatedTheme)
            }
          )
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

export const { useUpdateThemeMutation, useHideAccountMutation, useShowAccountMutation } =
  endpoints
