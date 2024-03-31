import { Account } from 'entities/Account'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
  TransferSelfDto,
  TransferUserDto,
  AccountPriorityDto,
} from 'dto/Account/req'
import { AccountDto } from 'dto/Account/resp'
import { PaginationReq } from 'dto/Common/req'
import { CoreAPI } from 'repos/lib'
import { AuthInfo } from 'common'

class AccountRepo {
  async OpenAccount(Dto: OpenAccountDto, AuthInfo: AuthInfo) {
    return (
      await CoreAPI.Req(AuthInfo).post<Account>('/account/user', null, {
        params: Dto,
      })
    ).data
  }

  async CloseAccount(Dto: CloseAccountDto, AuthInfo: AuthInfo) {
    await CoreAPI.Req(AuthInfo).delete(`/account/user/${Dto.accountId}`)
  }

  async GetAccounts(Dto: PaginationReq<SearchAccountDto>, AuthInfo: AuthInfo) {
    return (
      await CoreAPI.Req(AuthInfo).get<AccountDto[]>('/account/user', {
        params: Dto,
      })
    ).data
  }

  async GetAccount(Dto: GetAccountDto, AuthInfo: AuthInfo) {
    return (await CoreAPI.Req(AuthInfo).get<Account>(`/account/user/${Dto.accountId}`))
      .data
  }

  async Deposit(Dto: DepositDto, AuthInfo: AuthInfo) {
    await CoreAPI.Req(AuthInfo).post(`/account/user/${Dto.accountId}/deposit`, null, {
      params: {
        message: Dto.message,
        amount: Dto.amount,
      },
    })
  }

  async Withdraw(Dto: WithdrawDto, AuthInfo: AuthInfo) {
    await CoreAPI.Req(AuthInfo).post(`/account/user/${Dto.accountId}/withdraw`, null, {
      params: {
        message: Dto.message,
        amount: Dto.amount,
      },
    })
  }

  async TransferSelf(Dto: TransferSelfDto, AuthInfo: AuthInfo) {
    await CoreAPI.Req(AuthInfo).post(
      `/account/user/${Dto.fromAccountId}/transfer/${Dto.toAccountId}`,
      null,
      {
        params: {
          amount: Dto.amount,
        },
      }
    )
  }

  async TransferUser(Dto: TransferUserDto, AuthInfo: AuthInfo) {
    await CoreAPI.Req(AuthInfo).post(
      `/account/user/${Dto.fromAccountId}/transfer/${Dto.userId}/toUser`,
      null,
      {
        params: {
          amount: Dto.amount,
        },
      }
    )
  }

  async MakePriority(Dto: AccountPriorityDto, AuthInfo: AuthInfo) {
    await CoreAPI.Req(AuthInfo).post(`/account/user/${Dto.accountId}/priority`)
  }
}

export default AccountRepo
