import { Response } from 'express'
import { PreferencesService } from 'services/PreferencesService'

import {
  GetHiddenAccountsReq,
  GetPreferencesReq,
  GetThemeReq,
  HideAccountReq,
  ShowAccountReq,
  UpdateThemeReq,
} from './types'
import { ReqHelper } from 'common'
import { CacheService } from 'services/CacheService'

class PreferencesController {
  private _PreferencesService: PreferencesService
  private _CacheService: CacheService

  constructor(PreferencesService: PreferencesService, CacheService: CacheService) {
    this._PreferencesService = PreferencesService
    this._CacheService = CacheService
  }

  async GetPreferences(req: GetPreferencesReq, res: Response) {
    const data = await this._PreferencesService.GetPreferences(ReqHelper.AuthData(req))
    res.status(200).send(data)
  }

  async GetTheme(req: GetThemeReq, res: Response) {
    const data = await this._PreferencesService.GetTheme(ReqHelper.AuthData(req))
    res.status(200).send(data)
  }

  async GetHiddenAccounts(req: GetHiddenAccountsReq, res: Response) {
    const data = await this._PreferencesService.GetHiddenAccounts(ReqHelper.AuthData(req))
    res.status(200).send(data)
  }

  async UpdateTheme(req: UpdateThemeReq, res: Response) {
    const data = await this._PreferencesService.UpdateTheme(
      req.body,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
  }

  async HideAccount(req: HideAccountReq, res: Response) {
    const data = await this._PreferencesService.HideAccount(
      req.body,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
  }

  async ShowAccount(req: ShowAccountReq, res: Response) {
    const data = await this._PreferencesService.ShowAccount(
      req.body,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
  }
}

export default PreferencesController
