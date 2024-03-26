import { Response } from 'express'
import {
  CloseAccountReq,
  DepositReq,
  GetAccountReq,
  GetAccountsReq,
  OpenAccountReq,
  TransferSelfReq,
  TransferUserReq,
  WithdrawReq,
} from 'controllers/Account/types'

import { AccountService } from 'services/AccountService'
import { AuthHelper } from 'common'

class AccountController {
  private _AccountService: AccountService

  constructor(AccountService: AccountService) {
    this._AccountService = AccountService
  }

  async OpenAccount(req: OpenAccountReq, res: Response) {
    const data = await this._AccountService.OpenAccount(req.query, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async CloseAccount(req: CloseAccountReq, res: Response) {
    const data = await this._AccountService.CloseAccount(req.body, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetAccounts(req: GetAccountsReq, res: Response) {
    const data = await this._AccountService.GetAccounts(req.query, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetAccount(req: GetAccountReq, res: Response) {
    const data = await this._AccountService.GetAccount(req.params, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async Deposit(req: DepositReq, res: Response) {
    const data = await this._AccountService.Deposit(
      {
        ...req.query,
        ...req.params,
      },
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }

  async Withdraw(req: WithdrawReq, res: Response) {
    const data = await this._AccountService.Withdraw(
      {
        ...req.query,
        ...req.params,
      },
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }

  async TransferSelf(req: TransferSelfReq, res: Response) {
    const data = await this._AccountService.TransferSelf(
      {
        ...req.query,
        ...req.params,
      },
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }

  async TransferUser(req: TransferUserReq, res: Response) {
    const data = await this._AccountService.TransferUser(
      {
        ...req.query,
        ...req.params,
      },
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }
}

export default AccountController
