import { parseBoolean } from 'common'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq } from 'dto/Common'
import { Account, FullAccount } from 'entities/Account'
import { AccountRepo } from 'repos/AccountRepo'
import { PreferencesRepo } from 'repos/PreferencesRepo'

class AccountService {
  private _AccountRepo: AccountRepo
  private _PreferencesRepo: PreferencesRepo

  constructor(AccountRepo: AccountRepo, PreferencesRepo: PreferencesRepo) {
    this._AccountRepo = AccountRepo
    this._PreferencesRepo = PreferencesRepo
  }

  private async _TransformAccounts(accounts: Account[]) {
    const { hiddenAccounts } = await this._PreferencesRepo.GetHiddenAccounts()
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

  async OpenAccount(Dto: OpenAccountDto) {
    return await this._AccountRepo.OpenAccount(Dto)
  }

  async CloseAccount(Dto: CloseAccountDto) {
    return await this._AccountRepo.CloseAccount(Dto)
  }

  async GetAccounts(Dto: PaginationReq<SearchAccountDto>) {
    const accounts = await this._AccountRepo.GetAccounts(Dto)
    const FullAccounts = await this._TransformAccounts(accounts)
    const hidden = parseBoolean(Dto.hidden)
    return FullAccounts.filter((acc) => hidden === undefined || acc.hidden === hidden)
  }

  async GetAccount(Dto: GetAccountDto) {
    const accounts = [await this._AccountRepo.GetAccount(Dto)]
    return (await this._TransformAccounts(accounts))[0]
  }

  async Deposit(Dto: DepositDto) {
    return await this._AccountRepo.Deposit(Dto)
  }

  async Withdraw(Dto: WithdrawDto) {
    return await this._AccountRepo.Withdraw(Dto)
  }
}

export default AccountService
