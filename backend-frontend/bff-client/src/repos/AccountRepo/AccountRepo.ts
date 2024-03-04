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
import { Req } from 'repos/lib'

class AccountRepo implements IAccountRepo {
  async OpenAccount(Dto: OpenAccountDto) {
    return (
      await Req.Core.post<Account>('/account/user', null, {
        params: {
          CurrencyType: Dto.type,
        },
      })
    ).data
  }

  async CloseAccount(Dto: CloseAccountDto) {
    await Req.Core.delete<Account>(`/account/user/${Dto.AccountId}`)
  }

  async GetAccounts(Dto: PaginationReq<SearchAccountDto>) {
    return (await Req.Core.get<AccountDto[]>('/account/user')).data
  }

  async GetAccount(Dto: GetAccountDto) {
    return (await Req.Core.get<Account>(`/account/user/${Dto.AccountId}`)).data
  }

  async Deposit(Dto: DepositDto) {
    await Req.Core.post<Account>(`/account/user/${Dto.AccountId}/deposit`, null, {
      params: Dto,
    })
  }

  async Withdraw(Dto: WithdrawDto) {
    await Req.Core.post<Account>(`/account/user/${Dto.AccountId}/withdraw`, null, {
      params: Dto,
    })
  }
}

export default AccountRepo
