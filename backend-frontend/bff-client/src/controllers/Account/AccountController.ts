import { Response } from 'express'
import { IAccountService } from './IAccountService'
import {
  CloseAccountReq,
  DepositReq,
  GetAccountReq,
  GetAccountsReq,
  OpenAccountReq,
  WithdrawReq,
} from 'controllers/Account/types'
import { Extractor } from 'common/Extractor'

class AccountController {
  private _AccountService: IAccountService

  constructor(AccountService: IAccountService) {
    this._AccountService = AccountService
  }

  async OpenAccount(req: OpenAccountReq, res: Response) {
    const data = await this._AccountService.OpenAccount(Extractor.ExtractBody(req))
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
    const data = await this._AccountService.Deposit(Extractor.ExtractBody(req))
    res.status(200).send(data)
  }

  async Withdraw(req: WithdrawReq, res: Response) {
    const data = await this._AccountService.Withdraw(Extractor.ExtractBody(req))
    res.status(200).send(data)
  }
}

export default AccountController
