import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  GetLoansResp,
  GetLoansReq,
  RequestLoanResp,
  RequestLoanReq,
  ChargeLoanResp,
  ChargeLoanReq,
  GetPaymentsResp,
  GetPaymentsReq,
} from 'shared/api'
import { API_LOANS } from 'shared/config'

export const loansApi = createApi({
  reducerPath: 'loansApi',
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: API_LOANS, credentials: 'include' }),
  endpoints: (builder) => ({
    requestLoan: builder.mutation<RequestLoanResp, RequestLoanReq>({
      query: (params) => ({
        url: '/request',
        method: 'POST',
        params,
      }),
    }),
    chargeLoan: builder.mutation<ChargeLoanResp, ChargeLoanReq>({
      query: (params) => ({
        url: '/charge',
        method: 'POST',
        params,
      }),
    }),
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
    executeJob: builder.mutation<void, void>({
      query: () => ({
        url: '/',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetPaymentsQuery,
  useRequestLoanMutation,
  useChargeLoanMutation,
  useGetLoansQuery,
  useExecuteJobMutation,
} = loansApi
