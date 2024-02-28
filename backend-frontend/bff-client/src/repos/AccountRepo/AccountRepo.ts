import { Account } from 'entities/Account'
import { IAccountRepo } from 'services/AccountService'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
  AccountDto,
} from 'dto/Account'
import { PaginationReq, WithUser } from 'dto/Common'
import { MainInstance } from 'request/MainInstance'

class AccountRepo implements IAccountRepo {
  async OpenAccount(Dto: WithUser<OpenAccountDto>) {
    return (
      await MainInstance.get<Account>('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          Authorization: Dto.Authorization,
        },
      })
    ).data
  }

  async CloseAccount(Dto: WithUser<CloseAccountDto>) {
    await MainInstance.delete<Account>('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        Authorization: Dto.Authorization,
      },
    })
  }

  async GetAccounts(Dto: WithUser<PaginationReq<SearchAccountDto>>) {
    return (
      await MainInstance.get<AccountDto[]>(
        'https://jsonplaceholder.typicode.com/todos/1',
        {
          headers: {
            Authorization: Dto.Authorization,
          },
        }
      )
    ).data
  }

  async GetAccount(Dto: WithUser<GetAccountDto>) {
    return (
      await MainInstance.get<Account>('https://jsonplaceholder.typicode.com/todos/1', {
        headers: {
          Authorization: Dto.Authorization,
        },
      })
    ).data
  }

  async Deposit(Dto: WithUser<DepositDto>) {
    await MainInstance.post<Account>('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        Authorization: Dto.Authorization,
      },
    })
  }

  async Withdraw(Dto: WithUser<WithdrawDto>) {
    await MainInstance.post<Account>('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        Authorization: Dto.Authorization,
      },
    })
  }
}

export default AccountRepo
