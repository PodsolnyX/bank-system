import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_USER } from 'shared/config'
import {
  GetProfileReq,
  GetProfileResp,
  LogoutReq,
  LogoutResp,
  RegisterReq,
  RegisterResp,
} from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_USER, credentials: 'include' }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getProfile: builder.mutation<GetProfileResp, GetProfileReq>({
      query: (mail) => {
        if (!mail) {
          throw Error()
        }
        return {
          url: '/profile',
          method: 'POST',
          body: {
            mail,
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
    register: builder.mutation<RegisterResp, RegisterReq>({
      query: (body) => {
        return {
          url: '/register',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const { useGetProfileMutation, useLogoutMutation, useRegisterMutation } = userApi
