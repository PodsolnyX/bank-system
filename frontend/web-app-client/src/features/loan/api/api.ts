import { loansApi } from 'shared/api'
import { RequestLoanResp, RequestLoanReq, ChargeLoanResp, ChargeLoanReq } from './types'

const endpoints = loansApi.injectEndpoints({
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
    executeJob: builder.mutation<void, void>({
      query: () => ({
        url: '/',
        method: 'POST',
      }),
    }),
  }),
})

export const { useRequestLoanMutation, useChargeLoanMutation, useExecuteJobMutation } =
  endpoints
