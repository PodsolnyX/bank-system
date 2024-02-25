import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_USER } from 'shared/config'
import { GetProfileReq, GetProfileResp } from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_USER }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResp, GetProfileReq>({
      query: (email) => {
        if (!email) {
          throw Error()
        }
        return {
          url: '/profile',
          method: 'GET',
          params: {
            email,
          },
        }
      },
    }),
  }),
})

export const { useGetProfileQuery } = userApi
