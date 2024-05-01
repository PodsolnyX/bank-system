import { PaginationReq } from 'dto/Common/req'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchLoanUserDto,
  GetPaymentsDto,
} from 'dto/Loan/req'
import { LoanRepo } from 'repos/LoanRepo'
import { ReqMetaInfo } from 'common'

class LoanService {
  private _LoanRepo: LoanRepo

  constructor(LoanRepo: LoanRepo) {
    this._LoanRepo = LoanRepo
  }

  async RequestLoan(Dto: RequestLoanDto, AuthInfo: ReqMetaInfo) {
    return await this._LoanRepo.RequestLoan(Dto, AuthInfo)
  }

  async ChargeLoan(Dto: ChargeLoanDto, AuthInfo: ReqMetaInfo) {
    return await this._LoanRepo.ChargeLoan(Dto, AuthInfo)
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>, AuthInfo: ReqMetaInfo) {
    return await this._LoanRepo.GetLoans(Dto, AuthInfo)
  }

  async GetPayments(Dto: GetPaymentsDto, AuthInfo: ReqMetaInfo) {
    return await this._LoanRepo.GetPayments(Dto, AuthInfo)
  }

  async ExecuteJob(AuthInfo: ReqMetaInfo) {
    return await this._LoanRepo.ExecuteJob(AuthInfo)
  }

  async GetRating(AuthInfo: ReqMetaInfo) {
    return await this._LoanRepo.GetRating(AuthInfo)
  }
}

export default LoanService
