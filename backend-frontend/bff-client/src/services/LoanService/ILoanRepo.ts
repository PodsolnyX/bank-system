import { PaginationReq } from "dto/Common"
import { ChargeLoanDto, RequestLoanDto, SearchTariffDto, TariffDto, LoanDto, SearchLoanUserDto } from "dto/Loan"

export interface ILoanRepo {
    RequestLoan(Dto: RequestLoanDto): Promise<void>
    ChargeLoan(Dto: ChargeLoanDto): Promise<void>
    GetTariffs(Dto: PaginationReq<SearchTariffDto>): TariffDto[]
    GetLoands(Dto: PaginationReq<SearchLoanUserDto>): LoanDto[]
}