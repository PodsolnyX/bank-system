import { loansApi } from 'shared/api'
import {
  GetLoansResp,
  GetLoansReq,
  GetPaymentsResp,
  GetPaymentsReq,
  GetRatingReq,
  GetRatingResp,
} from './types'

const endpoints = loansApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoans: builder.query<GetLoansResp, GetLoansReq>({
      query: (params) => ({
        url: '/loans',
        method: 'GET',
        params,
      }),
    }),
    getPayments: builder.query<GetPaymentsResp, GetPaymentsReq>({
      query: (params) => ({
        url: '/payments',
        method: 'GET',
        params,
      }),
    }),
    getRating: builder.query<GetRatingResp, GetRatingReq>({
      query: () => ({
        url: '/rating',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetPaymentsQuery, useGetLoansQuery, useGetRatingQuery } = endpoints
