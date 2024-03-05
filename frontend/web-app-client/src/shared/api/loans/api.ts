import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  GetLoansResp,
  GetLoansReq,
  RequestLoanResp,
  RequestLoanReq,
  ChargeLoanResp,
  ChargeLoanReq,
  GetLoanResp,
  GetLoanReq,
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
      query: (data) => ({
        url: '/charge',
        method: 'POST',
        data,
      }),
    }),
    getLoans: builder.query<GetLoansResp, GetLoansReq>({
      query: (params) => ({
        url: '/loans',
        method: 'GET',
        params,
      }),
    }),
    getLoan: builder.query<GetLoanResp, GetLoanReq>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useRequestLoanMutation,
  useChargeLoanMutation,
  useGetLoansQuery,
  useGetLoanQuery,
} = loansApi
