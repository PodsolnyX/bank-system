import { PaginationReq, WithUser } from 'dto/Common'
import {SearchLoanUserDto, GetLoanDto, LoanDto} from 'dto/Loan'
import {LoanAPI} from "../../repos/lib";
import {GetUserPayments} from "../../dto/Loan/GetUserPayments";
import {UserPaymentsDto} from "../../dto/Loan/UserPaymentsDto";

class LoanService {

  constructor() {

    this.GetLoans = this.GetLoans.bind(this)
    this.GetLoan = this.GetLoan.bind(this)
    this.GetUserPayments = this.GetUserPayments.bind(this)
  }

  async GetLoans(Dto: WithUser<PaginationReq<SearchLoanUserDto>>) {
    return (
        await LoanAPI.Req.get<LoanDto[]>('/loan/user', {
          params: Dto,
        })
    ).data
  }

  async GetLoan(Dto: WithUser<GetLoanDto>) {
    return (
        await LoanAPI.Req.get<LoanDto[]>('/loan/employee', {
          params: {
            AccountIds: [Dto.LoanId]
          },
        })
    ).data[0]
  }

  async GetUserPayments(Dto: WithUser<GetUserPayments>) {
    return (await LoanAPI.Req.get<UserPaymentsDto[]>(`/loan/employee/${Dto.UserId}`, {
      params: {
        LoanIds: [Dto.LoanId],
        OnlyActual: false
      }
    })).data
  }
}

export default LoanService
