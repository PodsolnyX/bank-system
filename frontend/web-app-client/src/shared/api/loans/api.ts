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
  GetLoanResp,
  GetLoanReq,
} from 'shared/api'
import { API_LOANS } from 'shared/config'

export const loansApi = createApi({
  reducerPath: 'loansApi',
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({ baseUrl: API_LOANS, credentials: "include" }),
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
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),
    getLoans: builder.query<GetLoansResp, GetLoansReq>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),
    getLoan: builder.query<GetLoanResp, GetLoanReq>({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const {
  useRequestLoanMutation,
  useChargeLoanMutation,
  useGetTariffsQuery,
  useGetLoansQuery,
  useGetLoanQuery,
} = loansApi
