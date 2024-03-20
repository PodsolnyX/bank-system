import { GetTariffsResp, GetTariffsReq } from './types'
import { tariffsApi } from 'shared/api'

const endpoints = tariffsApi.injectEndpoints({
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

export const { useGetTariffsQuery } = endpoints
