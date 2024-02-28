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
import { MainInstance } from 'request/MainInstance'

class LoanRepo implements ILoanRepo {
  async RequestLoan(Dto: WithUser<RequestLoanDto>) {
    await MainInstance.post('https://jsonplaceholder.typicode.com/todos/1')
  }

  async ChargeLoan(Dto: WithUser<ChargeLoanDto>) {
    await MainInstance.post('https://jsonplaceholder.typicode.com/todos/1')
  }

  async GetTariffs(Dto: WithUser<PaginationReq<SearchTariffDto>>) {
    return (
      await MainInstance.get<TariffDto[]>('https://jsonplaceholder.typicode.com/todos/1')
    ).data
  }

  async GetLoans(Dto: WithUser<PaginationReq<SearchLoanUserDto>>) {
    return (
      await MainInstance.get<LoanDto[]>('https://jsonplaceholder.typicode.com/todos/1')
    ).data
  }

  async GetLoan(Dto: WithUser<GetLoanDto>) {
    return (
      await MainInstance.get<LoanDto>('https://jsonplaceholder.typicode.com/todos/1')
    ).data
  }
}

export default LoanRepo
