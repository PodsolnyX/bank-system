import { Request } from 'express'
import { PaginationReq } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'

export type RequestLoanReq = Request<{}, {}, RequestLoanDto>
export type ChargeLoanReq = Request<{}, {}, ChargeLoanDto>
export type GetTariffsReq = Request<PaginationReq<SearchTariffDto>>
export type GetLoansReq = Request<PaginationReq<SearchLoanUserDto>>
export type GetLoanReq = Request<GetLoanDto>
