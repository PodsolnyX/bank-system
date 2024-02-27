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
import { MainInstance } from 'repos/lib/MainInstance'

class LoanRepo implements ILoanRepo {
  async RequestLoan(Dto: RequestLoanDto) {
    await MainInstance.post('https://jsonplaceholder.typicode.com/todos/1')
  }

  async ChargeLoan(Dto: ChargeLoanDto) {
    await MainInstance.post('https://jsonplaceholder.typicode.com/todos/1')
  }

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>) {
    return (
      await MainInstance.get<TariffDto[]>('https://jsonplaceholder.typicode.com/todos/1')
    ).data
  }

  async GetLoans(Dto: PaginationReq<SearchLoanUserDto>) {
    return (
      await MainInstance.get<LoanDto[]>('https://jsonplaceholder.typicode.com/todos/1')
    ).data
  }

  async GetLoan(Dto: GetLoanDto) {
    return (
      await MainInstance.get<LoanDto>('https://jsonplaceholder.typicode.com/todos/1')
    ).data
  }
}

export default LoanRepo
