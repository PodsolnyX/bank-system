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
import { PaginationReq } from 'dto/Common'
import { CoreReq } from 'request/Core'

class AccountRepo implements IAccountRepo {
  async OpenAccount(Dto: OpenAccountDto) {
    return (
      await CoreReq.post<Account>('/account/user', null, {
        params: {
          CurrencyType: Dto.type,
        },
      })
    ).data
  }

  async CloseAccount(Dto: CloseAccountDto) {
    await CoreReq.delete<Account>(`/account/user/${Dto.AccountId}`)
  }

  async GetAccounts(Dto: PaginationReq<SearchAccountDto>) {
    return (await CoreReq.get<AccountDto[]>('/account/user')).data
  }

  async GetAccount(Dto: GetAccountDto) {
    return (await CoreReq.get<Account>(`/account/user/${Dto.AccountId}`)).data
  }

  async Deposit(Dto: DepositDto) {
    await CoreReq.post<Account>(`/account/user/${Dto.AccountId}/deposit`, null, {
      params: Dto,
    })
  }

  async Withdraw(Dto: WithdrawDto) {
    await CoreReq.post<Account>(`/account/user/${Dto.AccountId}/withdraw`, null, {
      params: Dto,
    })
  }
}

export default AccountRepo
