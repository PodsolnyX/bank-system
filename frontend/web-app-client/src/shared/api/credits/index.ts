import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_CREDITS } from 'shared/config'

export const creditsApi = createApi({
    reducerPath: 'creditsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_CREDITS }),
    endpoints: (builder) => ({}),
})