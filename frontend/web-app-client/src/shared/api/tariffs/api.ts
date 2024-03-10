import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetTariffsReq, GetTariffsResp } from 'shared/api'
import { API_TARIFFS } from 'shared/config'

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: API_TARIFFS, credentials: 'include' }),
  endpoints: (builder) => ({
    getTariffs: builder.query<GetTariffsResp, GetTariffsReq>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useGetTariffsQuery } = tariffsApi
