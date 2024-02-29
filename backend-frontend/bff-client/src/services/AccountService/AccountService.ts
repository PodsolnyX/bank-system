import { IAccountService } from 'controllers/Account'
import { IAccountRepo } from 'services/AccountService'
import {
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq, WithUser } from 'dto/Common'

class AccountService implements IAccountService {
  private _AccountRepo: IAccountRepo

  constructor(AccountRepo: IAccountRepo) {
    this._AccountRepo = AccountRepo

    this.OpenAccount = this.OpenAccount.bind(this)
    this.CloseAccount = this.CloseAccount.bind(this)
    this.GetAccounts = this.GetAccounts.bind(this)
    this.GetAccount = this.GetAccount.bind(this)
    this.Deposit = this.Deposit.bind(this)
    this.Withdraw = this.Withdraw.bind(this)
  }

  async OpenAccount(Dto: WithUser<OpenAccountDto>) {
    return await this._AccountRepo.OpenAccount(Dto)
  }

  async CloseAccount(Dto: WithUser<CloseAccountDto>) {
    return await this._AccountRepo.CloseAccount(Dto)
  }

  async GetAccounts(Dto: WithUser<PaginationReq<SearchAccountDto>>) {
    return await this._AccountRepo.GetAccounts(Dto)
  }

  async GetAccount(Dto: WithUser<GetAccountDto>) {
    return await this._AccountRepo.GetAccount(Dto)
  }

  async Deposit(Dto: WithUser<DepositDto>) {
    return await this._AccountRepo.Deposit(Dto)
  }

  async Withdraw(Dto: WithUser<WithdrawDto>) {
    return await this._AccountRepo.Withdraw(Dto)
  }
}

export default AccountService
