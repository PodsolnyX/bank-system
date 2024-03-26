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

class AccountRepo {
  async OpenAccount(Dto: OpenAccountDto) {
    return (
      await CoreAPI.Req.post<Account>('/account/user', null, {
        params: Dto,
      })
    ).data
  }

  async CloseAccount(Dto: CloseAccountDto) {
    await CoreAPI.Req.delete<Account>(`/account/user/${Dto.accountId}`)
  }

  async GetAccounts(Dto: PaginationReq<SearchAccountDto>) {
    return (
      await CoreAPI.Req.get<AccountDto[]>('/account/user', {
        params: Dto,
      })
    ).data
  }

  async GetAccount(Dto: GetAccountDto) {
    return (await CoreAPI.Req.get<Account>(`/account/user/${Dto.accountId}`)).data
  }

  async Deposit(Dto: DepositDto) {
    await CoreAPI.Req.post(`/account/user/${Dto.accountId}/deposit`, null, {
      params: {
        message: Dto.message,
        amount: Dto.amount,
      },
    })
  }

  async Withdraw(Dto: WithdrawDto) {
    await CoreAPI.Req.post(`/account/user/${Dto.accountId}/withdraw`, null, {
      params: {
        message: Dto.message,
        amount: Dto.amount,
      },
    })
  }

  async TransferSelf(Dto: TransferSelfDto) {
    await CoreAPI.Req.post(
      `/account/user/${Dto.fromAccountId}/transfer/${Dto.toAccountId}`,
      null,
      {
        params: {
          amount: Dto.amount,
        },
      }
    )
  }

  async TransferUser(Dto: TransferUserDto) {
    await CoreAPI.Req.post(
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
