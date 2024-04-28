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
import { ObserverService } from 'services/ObserverService'

class PreferencesController {
  private _PreferencesService: PreferencesService
  private _CacheService: CacheService
  private _ObserverService: ObserverService

  constructor(
    PreferencesService: PreferencesService,
    CacheService: CacheService,
    ObserverService: ObserverService
  ) {
    this._PreferencesService = PreferencesService
    this._CacheService = CacheService
    this._ObserverService = ObserverService
  }

  async GetPreferences(req: GetPreferencesReq, res: Response) {
    const data = await this._PreferencesService.GetPreferences(ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async GetTheme(req: GetThemeReq, res: Response) {
    const data = await this._PreferencesService.GetTheme(ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async GetHiddenAccounts(req: GetHiddenAccountsReq, res: Response) {
    const data = await this._PreferencesService.GetHiddenAccounts(ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async UpdateTheme(req: UpdateThemeReq, res: Response) {
    const data = await this._PreferencesService.UpdateTheme(
      req.body,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async HideAccount(req: HideAccountReq, res: Response) {
    const data = await this._PreferencesService.HideAccount(
      req.body,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }

  async ShowAccount(req: ShowAccountReq, res: Response) {
    const data = await this._PreferencesService.ShowAccount(
      req.body,
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }
}

export default PreferencesController
