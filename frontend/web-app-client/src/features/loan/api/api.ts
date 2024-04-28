import { WithKey, getKey, loansApi, rmKey } from 'shared/api'
import { RequestLoanResp, RequestLoanReq, ChargeLoanResp, ChargeLoanReq } from './types'

const endpoints = loansApi.injectEndpoints({
  endpoints: (builder) => ({
    requestLoan: builder.mutation<RequestLoanResp, RequestLoanReq>({
      query: (params) => ({
        url: '/request',
        method: 'POST',
        params: rmKey(params),
        headers: getKey(params)
      }),
    }),
    chargeLoan: builder.mutation<ChargeLoanResp, ChargeLoanReq>({
      query: (params) => ({
        url: '/charge',
        method: 'POST',
        params: rmKey(params),
        headers: getKey(params)
      }),
    }),
    executeJob: builder.mutation<void, WithKey>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        headers: getKey(data)
      }),
    }),
  }),
})

export const { useRequestLoanMutation, useChargeLoanMutation, useExecuteJobMutation } =
  endpoints
