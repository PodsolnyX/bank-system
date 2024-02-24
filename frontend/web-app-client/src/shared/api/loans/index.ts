import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  GetLoansResp,
  GetLoansReq,
  GetTariffsReq,
  GetTariffsResp,
  RequestLoanResp,
  RequestLoanReq,
  ChargeLoanResp,
  ChargeLoanReq,
} from 'shared/api/loans/types'
import { API_LOANS } from 'shared/config'

export const loansApi = createApi({
  reducerPath: 'loansApi',
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: API_LOANS }),
  endpoints: (builder) => ({
    requestLoan: builder.mutation<RequestLoanResp, RequestLoanReq>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    chargeLoan: builder.mutation<ChargeLoanResp, ChargeLoanReq>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    getTariffs: builder.query<GetTariffsResp, GetTariffsReq>({
      query: (body) => ({
        url: '',
        method: 'GET',
        body,
      }),
    }),
    getLoans: builder.query<GetLoansResp, GetLoansReq>({
      query: (body) => ({
        url: '',
        method: 'GET',
        body,
      }),
    }),
  }),
})

export const {
  useRequestLoanMutation,
  useChargeLoanMutation,
  useGetTariffsQuery,
  useGetLoansQuery,
} = loansApi
