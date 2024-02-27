import { PaginationReq } from "dto/Common"
import { ChargeLoanDto, RequestLoanDto, SearchTariffDto, TariffDto, LoanDto, SearchLoanUserDto } from "dto/Loan"

export interface ILoanService {
    RequestLoan(Dto: RequestLoanDto): Promise<void>
    ChargeLoan(Dto: ChargeLoanDto): Promise<void>
    GetTariffs(Dto: PaginationReq<SearchTariffDto>): Promise<TariffDto[]>
    GetLoans(Dto: PaginationReq<SearchLoanUserDto>): Promise<LoanDto[]>
}