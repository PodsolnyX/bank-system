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
import { LoanAPI } from 'repos/lib'

class LoanRepo implements ILoanRepo {
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

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>) {
    return (
      await LoanAPI.Req.get<TariffDto[]>('/tariff/user', {
        params: Dto,
      })
    ).data
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>) {
    return (
      await LoanAPI.Req.get<LoanDto[]>('/loan/user', {
        params: Dto,
      })
    ).data
  }

  async GetLoan(Dto: GetLoanDto) {
    return (await LoanAPI.Req.get<LoanDto>(`/loam/user/${Dto.LoanId}`)).data
  }
}

export default LoanRepo
