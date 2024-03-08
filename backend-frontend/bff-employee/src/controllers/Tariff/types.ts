import { Request } from 'express'
import { PaginationReq } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'
import {CreateTariffDto} from "../../dto/Loan/CreateTariffDto";
import {DeleteTariffDto} from "../../dto/Loan/DeleteTariffDto";

export type RequestLoanReq = Request<{}, {}, RequestLoanDto>
export type ChargeLoanReq = Request<{}, {}, ChargeLoanDto>
export type GetTariffsReq = Request<{}, {}, {}, PaginationReq<SearchTariffDto>>
export type CreateTariffReq = Request<{}, {}, CreateTariffDto>
export type DeleteTariffReq = Request<DeleteTariffDto>
export type GetLoansReq = Request<PaginationReq<SearchLoanUserDto>>
export type GetLoanReq = Request<GetLoanDto>
