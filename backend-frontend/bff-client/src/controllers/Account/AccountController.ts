import { Request, Response } from 'express'
import { IAccountService } from './IAccountService'
import {
  CloseAccountReq,
  DepositReq,
  GetAccountReq,
  GetAccountsReq,
  OpenAccountReq,
  WithdrawReq,
} from 'controllers/Account/types'

class AccountController {
  private _AccountService: IAccountService

  constructor(AccountService: IAccountService) {
    this._AccountService = AccountService
  }

  async OpenAccount(req: OpenAccountReq, res: Response) {
    const data = await this._AccountService.OpenAccount(req.body)
    res.status(200).send(data)
  }

  async CloseAccount(req: CloseAccountReq, res: Response) {
    const data = await this._AccountService.CloseAccount(req.body)
    res.status(200).send(data)
  }

  async GetAccounts(req: GetAccountsReq, res: Response) {
    const data = await this._AccountService.GetAccounts(req.body)
    res.status(200).send(data)
  }

  async GetAccount(req: GetAccountReq, res: Response) {
    const data = await this._AccountService.GetAccount(req.body)
    res.status(200).send(data)
  }

  async Deposit(req: DepositReq, res: Response) {
    const data = await this._AccountService.Deposit(req.body)
    res.status(200).send(data)
  }

  async Withdraw(req: WithdrawReq, res: Response) {
    const data = await this._AccountService.Withdraw(req.body)
    res.status(200).send(data)
  }
}

export default AccountController
