import { PaginationReq } from 'dto/Common/req'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchLoanUserDto,
  GetPaymentsDto,
} from 'dto/Loan/req'
import { LoanRepo } from 'repos/LoanRepo'
import { AuthInfo } from 'common'

class LoanService {
  private _LoanRepo: LoanRepo

  constructor(LoanRepo: LoanRepo) {
    this._LoanRepo = LoanRepo
  }

  async RequestLoan(Dto: RequestLoanDto, AuthInfo: AuthInfo) {
    return await this._LoanRepo.RequestLoan(Dto, AuthInfo)
  }

  async ChargeLoan(Dto: ChargeLoanDto, AuthInfo: AuthInfo) {
    return await this._LoanRepo.ChargeLoan(Dto, AuthInfo)
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>, AuthInfo: AuthInfo) {
    return await this._LoanRepo.GetLoans(Dto, AuthInfo)
  }

  async GetPayments(Dto: GetPaymentsDto, AuthInfo: AuthInfo) {
    return await this._LoanRepo.GetPayments(Dto, AuthInfo)
  }

  async ExecuteJob(AuthInfo: AuthInfo) {
    return await this._LoanRepo.ExecuteJob(AuthInfo)
  }

  async GetRating(AuthInfo: AuthInfo) {
    return await this._LoanRepo.GetRating(AuthInfo)
  }
}

export default LoanService
