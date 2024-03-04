import { PaginationReq, WithUser } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'
import { LoanRepo } from 'repos/LoanRepo'

class LoanService {
  private _LoanRepo: LoanRepo

  constructor(LoanRepo: LoanRepo) {
    this._LoanRepo = LoanRepo

    this.RequestLoan = this.RequestLoan.bind(this)
    this.ChargeLoan = this.ChargeLoan.bind(this)
    this.GetTariffs = this.GetTariffs.bind(this)
    this.GetLoans = this.GetLoans.bind(this)
  }

  async RequestLoan(Dto: WithUser<RequestLoanDto>) {
    return await this._LoanRepo.RequestLoan(Dto)
  }

  async ChargeLoan(Dto: WithUser<ChargeLoanDto>) {
    return await this._LoanRepo.ChargeLoan(Dto)
  }

  async GetTariffs(Dto: WithUser<PaginationReq<SearchTariffDto>>) {
    return await this._LoanRepo.GetTariffs(Dto)
  }

  async GetLoans(Dto: WithUser<PaginationReq<SearchLoanUserDto>>) {
    return await this._LoanRepo.GetLoans(Dto)
  }

  async GetLoan(Dto: WithUser<GetLoanDto>) {
    return await this._LoanRepo.GetLoan(Dto)
  }
}

export default LoanService
