import { ILoanRepo } from 'services/LoanService'
import { PaginationReq } from 'dto/Common'
import {
  ChargeLoanDto,
  RequestLoanDto,
  SearchTariffDto,
  TariffDto,
  LoanDto,
  SearchLoanUserDto,
  GetLoanDto,
} from 'dto/Loan'
import { Req } from 'repos/lib'

class LoanRepo implements ILoanRepo {
  async RequestLoan(Dto: RequestLoanDto) {
    await Req.Loan.post('/loan/user/request', null, {
      params: Dto,
    })
  }

  async ChargeLoan(Dto: ChargeLoanDto) {
    await Req.Loan.post('/loan/user/charge', null, {
      params: Dto,
    })
  }

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>) {
    return (
      await Req.Loan.get<TariffDto[]>('/tariff/user', {
        params: Dto,
      })
    ).data
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>) {
    return (
      await Req.Loan.get<LoanDto[]>('/loan/user', {
        params: Dto,
      })
    ).data
  }

  async GetLoan(Dto: GetLoanDto) {
    return (await Req.Loan.get<LoanDto>(`/loam/user/${Dto.LoanId}`)).data
  }
}

export default LoanRepo
