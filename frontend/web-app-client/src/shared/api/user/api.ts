import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_USER } from 'shared/config'
import {
  GetProfileReq,
  GetProfileResp,
  GetStatusReq,
  GetStatusResp,
  LogoutReq,
  LogoutResp,
  RegisterReq,
  RegisterResp,
} from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_USER, credentials: 'include' }),
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResp, GetProfileReq>({
      query: (mail) => {
        if (!mail) {
          throw Error()
        }
        return {
          url: '/',
          method: 'GET',
          params: {
            mail,
          },
        }
      },
    }),
    getStatus: builder.query<GetStatusResp, GetStatusReq>({
      query: (mail) => {
        if (!mail) {
          throw Error()
        }
        return {
          url: '/status',
          method: 'GET',
          params: {
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
          url: '/',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useLazyGetStatusQuery,
  useGetStatusQuery,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
} = userApi
