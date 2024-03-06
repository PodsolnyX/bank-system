import { Response } from 'express'
import {
  GetAccountReq,
  GetAccountsReq,
} from 'controllers/Account/types'
import { Extractor } from '../lib/Extractor'
import { AccountService } from 'services/AccountService'

class AccountController {
  private _AccountService: AccountService

  constructor(AccountService: AccountService) {
    this._AccountService = AccountService
  }

  async GetAccounts(req: GetAccountsReq, res: Response) {
    const data = await this._AccountService.GetAllAccounts(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async GetAccount(req: GetAccountReq, res: Response) {
    const data = await this._AccountService.GetAccount(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }
}

export default AccountController
