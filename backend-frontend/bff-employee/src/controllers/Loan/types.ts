import { Request } from 'express'
import { PaginationReq } from 'dto/Common'
import {
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'
import {GetUserPayments} from "../../dto/Loan/GetUserPayments";

export type GetLoansReq = Request<{}, {}, {}, PaginationReq<SearchLoanUserDto>>
export type GetUserPaymentsReq = Request<GetUserPayments>
export type GetLoanReq = Request<GetLoanDto>
