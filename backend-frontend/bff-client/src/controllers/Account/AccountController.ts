import { Response } from 'express'
import {
  CloseAccountReq,
  DepositReq,
  GetAccountReq,
  GetAccountsReq,
  MakePriorityReq,
  OpenAccountReq,
  TransferSelfReq,
  TransferUserReq,
  WithdrawReq,
} from 'controllers/Account/types'

import { AccountService } from 'services/AccountService'
import { CacheService } from 'services/CacheService'
import { ReqHelper } from 'common'
import { ObserverService } from 'services/ObserverService'

class AccountController {
  private _AccountService: AccountService
  private _CacheService: CacheService
  private _ObserverService: ObserverService

  constructor(AccountService: AccountService, CacheService: CacheService, ObserverService: ObserverService) {
    this._AccountService = AccountService
    this._CacheService = CacheService
    this._ObserverService = ObserverService
  }

  async OpenAccount(req: OpenAccountReq, res: Response) {
    const data = await this._AccountService.OpenAccount(
      req.query,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async CloseAccount(req: CloseAccountReq, res: Response) {
    const data = await this._AccountService.CloseAccount(
      req.params,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async GetAccounts(req: GetAccountsReq, res: Response) {
    const data = await this._AccountService.GetAccounts(
      req.query,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async GetAccount(req: GetAccountReq, res: Response) {
    const data = await this._AccountService.GetAccount(
      req.params,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async Deposit(req: DepositReq, res: Response) {
    const data = await this._AccountService.Deposit(
      {
        ...req.query,
        ...req.params,
      },
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async Withdraw(req: WithdrawReq, res: Response) {
    const data = await this._AccountService.Withdraw(
      {
        ...req.query,
        ...req.params,
      },
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async TransferSelf(req: TransferSelfReq, res: Response) {
    const data = await this._AccountService.TransferSelf(
      {
        ...req.query,
        ...req.params,
      },
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async TransferUser(req: TransferUserReq, res: Response) {
    const data = await this._AccountService.TransferUser(
      {
        ...req.query,
        ...req.params,
      },
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async MakePriority(req: MakePriorityReq, res: Response) {
    const data = await this._AccountService.MakePriority(
      req.params,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }
}

export default AccountController
