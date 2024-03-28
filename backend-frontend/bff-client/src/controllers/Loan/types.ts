import { Request } from 'express'
import { PaginationReq } from 'dto/Common/req'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchLoanUserDto,
  GetPaymentsDto,
} from 'dto/Loan/req'

export type RequestLoanReq = Request<{}, {}, {}, RequestLoanDto>
export type ChargeLoanReq = Request<{}, {}, {}, ChargeLoanDto>
export type GetLoansReq = Request<{}, {}, {}, PaginationReq<SearchLoanUserDto>>
export type GetPaymentsReq = Request<{}, {}, {}, GetPaymentsDto>
