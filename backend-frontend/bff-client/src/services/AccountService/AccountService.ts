import { ReqMetaInfo, parseBoolean } from 'common'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
  TransferUserDto,
  TransferSelfDto,
  AccountPriorityDto,
} from 'dto/Account/req'
import { PaginationReq } from 'dto/Common/req'
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

  private async _TransformAccounts(accounts: Account[], AuthInfo: ReqMetaInfo) {
    const { hiddenAccounts } = await this._PreferencesRepo.GetHiddenAccounts(AuthInfo)
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

  async OpenAccount(Dto: OpenAccountDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.OpenAccount(Dto, AuthInfo)
  }

  async CloseAccount(Dto: CloseAccountDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.CloseAccount(Dto, AuthInfo)
  }

  async GetAccounts(Dto: PaginationReq<SearchAccountDto>, AuthInfo: ReqMetaInfo) {
    const accounts = await this._AccountRepo.GetAccounts(Dto, AuthInfo)
    const FullAccounts = await this._TransformAccounts(accounts, AuthInfo)
    const hidden = parseBoolean(Dto.hidden)
    return FullAccounts.filter((acc) => hidden === undefined || acc.hidden === hidden)
  }

  async GetAccount(Dto: GetAccountDto, AuthInfo: ReqMetaInfo) {
    const accounts = [await this._AccountRepo.GetAccount(Dto, AuthInfo)]
    return (await this._TransformAccounts(accounts, AuthInfo))[0]
  }

  async Deposit(Dto: DepositDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.Deposit(Dto, AuthInfo)
  }

  async Withdraw(Dto: WithdrawDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.Withdraw(Dto, AuthInfo)
  }

  async TransferSelf(Dto: TransferSelfDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.TransferSelf(Dto, AuthInfo)
  }

  async TransferUser(Dto: TransferUserDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.TransferUser(Dto, AuthInfo)
  }

  async MakePriority(Dto: AccountPriorityDto, AuthInfo: ReqMetaInfo) {
    return await this._AccountRepo.MakePriority(Dto, AuthInfo)
  }
}

export default AccountService
