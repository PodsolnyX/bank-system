import { AuthInfo } from 'common'
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
  async RequestLoan(Dto: RequestLoanDto, AuthInfo: AuthInfo) {
    await LoanAPI.Req(AuthInfo).post('/loan/user/request', null, {
      params: Dto,
    })
  }

  async ChargeLoan(Dto: ChargeLoanDto, AuthInfo: AuthInfo) {
    await LoanAPI.Req(AuthInfo).post('/loan/user/charge', null, {
      params: Dto,
    })
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>, AuthInfo: AuthInfo) {
    return (
      await LoanAPI.Req(AuthInfo).get<LoanDto[]>('/loan/user', {
        params: Dto,
      })
    ).data
  }

  async GetPayments(Dto: GetPaymentsDto, AuthInfo: AuthInfo) {
    return (
      await LoanAPI.Req(AuthInfo).get<UserPaymentDto[]>('/loan/user/payments', {
        params: Dto,
      })
    ).data
  }

  async ExecuteJob(AuthInfo: AuthInfo) {
    await LoanAPI.Req(AuthInfo).post('/loan/user')
  }

  async GetRating(AuthInfo: AuthInfo) {
    return (await LoanAPI.Req(AuthInfo).get<LoanRatingDto>('/loan/user/rating')).data
  }
}

export default LoanRepo
