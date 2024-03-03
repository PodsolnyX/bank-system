import { ILoanRepo } from 'services/LoanService'
import { PaginationReq, WithUser } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  TariffDto,
  LoanDto,
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'
import { LoanReq } from 'request/Loan'

class LoanRepo implements ILoanRepo {
  async RequestLoan(Dto: RequestLoanDto) {
    await LoanReq.post('/loan/user/request', null, {
      params: Dto,
    })
  }

  async ChargeLoan(Dto: ChargeLoanDto) {
    await LoanReq.post('/loan/user/charge', null, {
      params: Dto,
    })
  }

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>) {
    return (
      await LoanReq.get<TariffDto[]>('/tariff/user', {
        params: Dto,
      })
    ).data
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>) {
    return (
      await LoanReq.get<LoanDto[]>('/loan/user', {
        params: Dto,
      })
    ).data
  }

  async GetLoan(Dto: GetLoanDto) {
    return (await LoanReq.get<LoanDto>(`/loam/user/${Dto.LoanId}`)).data
  }
}

export default LoanRepo
