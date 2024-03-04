import { Account } from 'entities/Account'
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
import { CoreAPI } from 'repos/lib'

class AccountRepo {
  async OpenAccount(Dto: OpenAccountDto) {
    return (
      await CoreAPI.Req.post<Account>('/account/user', null, {
        params: {
          CurrencyType: Dto.type,
        },
      })
    ).data
  }

  async CloseAccount(Dto: CloseAccountDto) {
    await CoreAPI.Req.delete<Account>(`/account/user/${Dto.AccountId}`)
  }

  async GetAccounts(_Dto: PaginationReq<SearchAccountDto>) {
    return (await CoreAPI.Req.get<AccountDto[]>('/account/user')).data
  }

  async GetAccount(Dto: GetAccountDto) {
    return (await CoreAPI.Req.get<Account>(`/account/user/${Dto.AccountId}`)).data
  }

  async Deposit(Dto: DepositDto) {
    await CoreAPI.Req.post<Account>(`/account/user/${Dto.AccountId}/deposit`, null, {
      params: Dto,
    })
  }

  async Withdraw(Dto: WithdrawDto) {
    await CoreAPI.Req.post<Account>(`/account/user/${Dto.AccountId}/withdraw`, null, {
      params: Dto,
    })
  }
}

export default AccountRepo
