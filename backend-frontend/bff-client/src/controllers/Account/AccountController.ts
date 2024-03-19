import { Response } from 'express'
import {
  CloseAccountReq,
  DepositReq,
  GetAccountReq,
  GetAccountsReq,
  OpenAccountReq,
  WithdrawReq,
} from 'controllers/Account/types'
import { Extractor } from 'common'
import { AccountService } from 'services/AccountService'

class AccountController {
  private _AccountService: AccountService

  constructor(AccountService: AccountService) {
    this._AccountService = AccountService
  }

  async OpenAccount(req: OpenAccountReq, res: Response) {
    const data = await this._AccountService.OpenAccount(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async CloseAccount(req: CloseAccountReq, res: Response) {
    const data = await this._AccountService.CloseAccount(Extractor.ExtractBody(req))
    res.status(200).send(data)
  }

  async GetAccounts(req: GetAccountsReq, res: Response) {
    const data = await this._AccountService.GetAccounts(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async GetAccount(req: GetAccountReq, res: Response) {
    const data = await this._AccountService.GetAccount(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async Deposit(req: DepositReq, res: Response) {
    const data = await this._AccountService.Deposit(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async Withdraw(req: WithdrawReq, res: Response) {
    const data = await this._AccountService.Withdraw(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }
}

export default AccountController
