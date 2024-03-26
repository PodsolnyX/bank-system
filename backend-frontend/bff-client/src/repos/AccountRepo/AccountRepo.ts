import { Account } from 'entities/Account'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
  AccountDto,
  TransferUserDto,
} from 'dto/Account'
import { PaginationReq } from 'dto/Common'
import { CoreAPI } from 'repos/lib'
import { TransferSelfDto } from 'dto/Account/TransferSelfDto'
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
    await CoreAPI.Req(AuthInfo).delete<Account>(`/account/user/${Dto.accountId}`)
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
      `/account/user/${Dto.fromAccountId}/transfer/${Dto.userId}`,
      null,
      {
        params: {
          amount: Dto.amount,
        },
      }
    )
  }
}

export default AccountRepo
