import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_OPERATIONS } from 'shared/config'

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: API_OPERATIONS }),
  endpoints: (builder) => ({}),
})
