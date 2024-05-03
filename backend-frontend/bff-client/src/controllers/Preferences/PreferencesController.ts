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
import { ObserverService } from 'services/ObserverService'

class PreferencesController {
  private _PreferencesService: PreferencesService
  private _ObserverService: ObserverService

  constructor(
    PreferencesService: PreferencesService,
    ObserverService: ObserverService
  ) {
    this._PreferencesService = PreferencesService
    this._ObserverService = ObserverService
  }

  async GetPreferences(req: GetPreferencesReq, res: Response) {
    const data = await this._PreferencesService.GetPreferences(ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async GetTheme(req: GetThemeReq, res: Response) {
    const data = await this._PreferencesService.GetTheme(ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async GetHiddenAccounts(req: GetHiddenAccountsReq, res: Response) {
    const data = await this._PreferencesService.GetHiddenAccounts(ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async UpdateTheme(req: UpdateThemeReq, res: Response) {
    const data = await this._PreferencesService.UpdateTheme(
      req.body,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async HideAccount(req: HideAccountReq, res: Response) {
    const data = await this._PreferencesService.HideAccount(
      req.body,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async ShowAccount(req: ShowAccountReq, res: Response) {
    const data = await this._PreferencesService.ShowAccount(
      req.body,
      ReqHelper.AuthData(req)
    )
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }
}

export default PreferencesController
