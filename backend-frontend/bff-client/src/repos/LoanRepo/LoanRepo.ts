import { PaginationReq } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  LoanDto,
  SearchLoanUserDto,
  UserPaymentDto,
  GetPaymentsDto
} from 'dto/Loan'
import { LoanAPI } from 'repos/lib'

class LoanRepo {
  async RequestLoan(Dto: RequestLoanDto) {
    await LoanAPI.Req.post('/loan/user/request', null, {
      params: Dto,
    })
  }

  async ChargeLoan(Dto: ChargeLoanDto) {
    await LoanAPI.Req.post('/loan/user/charge', null, {
      params: Dto,
    })
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>) {
    return (
      await LoanAPI.Req.get<LoanDto[]>('/loan/user', {
        params: Dto,
      })
    ).data
  }

  async GetPayments(Dto: GetPaymentsDto) {
    return (
      await LoanAPI.Req.get<UserPaymentDto[]>('/loan/user/payments', {
        params: Dto,
      })
    ).data
  }

  async ExecuteJob() {
    await LoanAPI.Req.post('/loan/user')
  }
}

export default LoanRepo
