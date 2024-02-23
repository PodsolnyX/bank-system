import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_OPERATIONS } from 'shared/config'

export const operationsApi = createApi({
    reducerPath: 'operationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_OPERATIONS }),
    endpoints: (builder) => ({}),
})