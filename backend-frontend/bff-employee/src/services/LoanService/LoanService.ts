import { PaginationReq } from 'dto/Common'
import {SearchLoanUserDto, GetLoanDto, LoanDto} from 'dto/Loan'
import {LoanAPI} from "../../repos/lib";
import {GetUserPayments} from "../../dto/Loan/GetUserPayments";
import {UserPaymentsDto} from "../../dto/Loan/UserPaymentsDto";
import {AuthInfo} from "common/Auth";

class LoanService {

  constructor() {

    this.GetLoans = this.GetLoans.bind(this)
    this.GetLoan = this.GetLoan.bind(this)
    this.GetUserPayments = this.GetUserPayments.bind(this)
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>, AuthInfo: AuthInfo) {
    return (
        await LoanAPI.Req(AuthInfo).get<LoanDto[]>('/loan/user', {
          params: Dto,
        })
    ).data
  }

  async GetLoan(Dto: GetLoanDto, AuthInfo: AuthInfo) {
    return (
        await LoanAPI.Req(AuthInfo).get<LoanDto[]>('/loan/employee', {
          params: {
            AccountIds: [Dto.LoanId]
          },
        })
    ).data[0]
  }

  async GetUserPayments(Dto: GetUserPayments, AuthInfo: AuthInfo) {
    return (await LoanAPI.Req(AuthInfo).get<UserPaymentsDto[]>(`/loan/employee/${Dto.UserId}`, {
      params: {
        LoanIds: [Dto.LoanId],
        OnlyActual: false
      }
    })).data
  }
}

export default LoanService
