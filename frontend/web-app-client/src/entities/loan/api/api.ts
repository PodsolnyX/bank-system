import { GetLoansResp, GetLoansReq, GetPaymentsResp, GetPaymentsReq } from './types'
import { loansApi } from 'shared/api'

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
  }),
})

export const { useGetPaymentsQuery, useGetLoansQuery } = endpoints
