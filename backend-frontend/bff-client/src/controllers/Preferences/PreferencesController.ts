import { Response } from 'express'
import { PreferencesService } from 'services/PreferencesService'

import {
  GetHiddenAccountsReq,
  GetPreferencesReq,
  GetThemeReq,
  HideAccountReq,
  ShowAccountReq,
  UpdateThemeReq,
} from 'controllers/Preferences/types'
import { AuthHelper } from 'common'

class PreferencesController {
  private _PreferencesService: PreferencesService

  constructor(PreferencesService: PreferencesService) {
    this._PreferencesService = PreferencesService
  }

  async GetPreferences(req: GetPreferencesReq, res: Response) {
    const data = await this._PreferencesService.GetPreferences(AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetTheme(req: GetThemeReq, res: Response) {
    const data = await this._PreferencesService.GetTheme(AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetHiddenAccounts(req: GetHiddenAccountsReq, res: Response) {
    const data = await this._PreferencesService.GetHiddenAccounts(AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async UpdateTheme(req: UpdateThemeReq, res: Response) {
    const data = await this._PreferencesService.UpdateTheme(
      req.body,
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }

  async HideAccount(req: HideAccountReq, res: Response) {
    const data = await this._PreferencesService.HideAccount(
      req.body,
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }

  async ShowAccount(req: ShowAccountReq, res: Response) {
    const data = await this._PreferencesService.ShowAccount(
      req.body,
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }
}

export default PreferencesController
