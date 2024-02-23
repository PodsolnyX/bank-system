import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_AUTH, API_BASE_URL } from 'shared/config'
import { AuthRequest, AuthResponse } from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthRequest, AuthResponse>({
      query: (token) => ({
        url: API_AUTH,
        method: 'POST',
        params: {
          token,
        },
        responseHandler: (resp) => resp.text(),
      }),
    }),
  }),
})

export const { useLoginUserMutation } = authApi
