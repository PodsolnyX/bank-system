import { PaginationReq } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchLoanUserDto,
  GetPaymentsDto,
} from 'dto/Loan'
import { LoanRepo } from 'repos/LoanRepo'

class LoanService {
  private _LoanRepo: LoanRepo

  constructor(LoanRepo: LoanRepo) {
    this._LoanRepo = LoanRepo
  }

  async RequestLoan(Dto: RequestLoanDto) {
    return await this._LoanRepo.RequestLoan(Dto)
  }

  async ChargeLoan(Dto: ChargeLoanDto) {
    return await this._LoanRepo.ChargeLoan(Dto)
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>) {
    return await this._LoanRepo.GetLoans(Dto)
  }

  async GetPayments(Dto: GetPaymentsDto) {
    return await this._LoanRepo.GetPayments(Dto)
  }

  async ExecuteJob() {
    return await this._LoanRepo.ExecuteJob()
  }

  async GetRating() {
    return await this._LoanRepo.GetRating()
  }
}

export default LoanService
