import { PaginationReq, WithUser } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  TariffDto,
  LoanDto,
  GetLoanDto,
  SearchLoanUserDto,
} from 'dto/Loan'

export interface ILoanRepo {
  RequestLoan(Dto: WithUser<RequestLoanDto>): Promise<void>
  ChargeLoan(Dto: WithUser<ChargeLoanDto>): Promise<void>
  GetTariffs(Dto: WithUser<PaginationReq<SearchTariffDto>>): Promise<TariffDto[]>
  GetLoans(Dto: WithUser<PaginationReq<SearchLoanUserDto>>): Promise<LoanDto[]>
  GetLoan(Dto: WithUser<GetLoanDto>): Promise<LoanDto>
}
