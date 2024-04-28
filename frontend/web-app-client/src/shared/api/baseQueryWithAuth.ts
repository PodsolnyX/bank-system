import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query'

export const baseQueryWithAuth = (args: FetchBaseQueryArgs) =>
  fetchBaseQuery({
    ...args,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.token

      if (token) {
        headers.set('authorization', token)
      }

      return headers
    },
  })

export const staggeredBaseQuery = (args: FetchBaseQueryArgs) =>
  retry(baseQueryWithAuth(args), {
    retryCondition: (error, _args, { attempt }) => error.status === 500 && attempt < 3,
  })
