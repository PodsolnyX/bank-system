import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_USER } from 'shared/config'
import { GetProfileReq, GetProfileResp, LogoutReq, LogoutResp } from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_USER, credentials: 'include' }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getProfile: builder.mutation<GetProfileResp, GetProfileReq>({
      query: (email) => {
        if (!email) {
          throw Error()
        }
        return {
          url: '/profile',
          method: 'POST',
          body: {
            email,
          },
        }
      },
    }),
    logout: builder.mutation<LogoutResp, LogoutReq>({
      query: () => {
        return {
          url: '/logout',
          method: 'POST',
        }
      },
    }),
  }),
})

export const { useGetProfileMutation, useLogoutMutation } = userApi
