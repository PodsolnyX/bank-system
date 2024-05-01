import { ReqMetaInfo } from 'common'
import { PaginationReq } from 'dto/Common/req'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchLoanUserDto,
  GetPaymentsDto,
  LoanRatingDto,
} from 'dto/Loan/req'
import { LoanDto, UserPaymentDto } from 'dto/Loan/resp'
import { LoanAPI } from 'repos/lib'

class LoanRepo {
  async RequestLoan(Dto: RequestLoanDto, AuthInfo: ReqMetaInfo) {
    await LoanAPI.Req(AuthInfo).post('/loan/user/request', null, {
      params: Dto,
    })
  }

  async ChargeLoan(Dto: ChargeLoanDto, AuthInfo: ReqMetaInfo) {
    await LoanAPI.Req(AuthInfo).post('/loan/user/charge', null, {
      params: Dto,
    })
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>, AuthInfo: ReqMetaInfo) {
    return (
      await LoanAPI.Req(AuthInfo).get<LoanDto[]>('/loan/user', {
        params: Dto,
      })
    ).data
  }

  async GetPayments(Dto: GetPaymentsDto, AuthInfo: ReqMetaInfo) {
    return (
      await LoanAPI.Req(AuthInfo).get<UserPaymentDto[]>('/loan/user/payments', {
        params: Dto,
      })
    ).data
  }

  async ExecuteJob(AuthInfo: ReqMetaInfo) {
    await LoanAPI.Req(AuthInfo).post('/loan/user')
  }

  async GetRating(AuthInfo: ReqMetaInfo) {
    return (await LoanAPI.Req(AuthInfo).get<LoanRatingDto>('/loan/user/rating')).data
  }
}

export default LoanRepo
