import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RootState } from 'shared/store'

export const baseQueryWithAuth = (args: FetchBaseQueryArgs) =>
  fetchBaseQuery({
    ...args,
    prepareHeaders: (headers, { getState }) => {
      const id = (getState() as RootState).authReducer.id

      if (id) {
        headers.set('authorization', id)
      }

      return headers
    },
  })
