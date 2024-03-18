import { parseBoolean } from 'common'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq, WithUser } from 'dto/Common'
import { Account, FullAccount } from 'entities/Account'
import { AccountRepo } from 'repos/AccountRepo'
import { PreferencesRepo } from 'repos/PreferencesRepo'

class AccountService {
  private _AccountRepo: AccountRepo
  private _PreferencesRepo: PreferencesRepo

  constructor(AccountRepo: AccountRepo, PreferencesRepo: PreferencesRepo) {
    this._AccountRepo = AccountRepo
    this._PreferencesRepo = PreferencesRepo

    this.OpenAccount = this.OpenAccount.bind(this)
    this.CloseAccount = this.CloseAccount.bind(this)
    this.GetAccounts = this.GetAccounts.bind(this)
    this.GetAccount = this.GetAccount.bind(this)
    this.Deposit = this.Deposit.bind(this)
    this.Withdraw = this.Withdraw.bind(this)
  }

  private async _TransformAccounts(mail: string, accounts: Account[]) {
    const { hiddenAccounts } = await this._PreferencesRepo.GetHiddenAccounts(mail)
    const FullAccounts: FullAccount[] = accounts.map((account) => ({
      ...account,
      hidden: hiddenAccounts.some((id) => id === account.id),
    }))

    return FullAccounts.sort((first, second) => {
      const isFirstClosed = !!first.closedAt
      const isSecondClose = !!second.closedAt

      return isFirstClosed === isSecondClose ? 0 : isFirstClosed ? 1 : -1
    })
  }

  async OpenAccount(Dto: WithUser<OpenAccountDto>) {
    return await this._AccountRepo.OpenAccount(Dto)
  }

  async CloseAccount(Dto: WithUser<CloseAccountDto>) {
    return await this._AccountRepo.CloseAccount(Dto)
  }

  async GetAccounts(Dto: WithUser<PaginationReq<SearchAccountDto>>) {
    const accounts = await this._AccountRepo.GetAccounts(Dto)
    const FullAccounts = await this._TransformAccounts(Dto.authId, accounts)
    const hidden = parseBoolean(Dto.hidden)
    return FullAccounts.filter((acc) => hidden === undefined || acc.hidden === hidden)
  }

  async GetAccount(Dto: WithUser<GetAccountDto>) {
    const accounts = [await this._AccountRepo.GetAccount(Dto)]
    return (await this._TransformAccounts(Dto.authId, accounts))[0]
  }

  async Deposit(Dto: WithUser<DepositDto>) {
    return await this._AccountRepo.Deposit(Dto)
  }

  async Withdraw(Dto: WithUser<WithdrawDto>) {
    return await this._AccountRepo.Withdraw(Dto)
  }
}

export default AccountService
