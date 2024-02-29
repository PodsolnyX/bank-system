import { ILoanService } from 'controllers/Loan'
import { ILoanRepo } from 'services/LoanService'
import { PaginationReq, WithUser } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'

class LoanService implements ILoanService {
  private _LoanRepo: ILoanRepo

  constructor(LoanRepo: ILoanRepo) {
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
