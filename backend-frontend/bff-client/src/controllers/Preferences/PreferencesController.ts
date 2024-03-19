import { Response } from 'express'
import { PreferencesService } from 'services/PreferencesService'
import { Extractor } from 'common'
import {
  GetHiddenAccountsReq,
  GetPreferencesReq,
  GetThemeReq,
  HideAccountReq,
  ShowAccountReq,
  UpdateThemeReq,
} from 'controllers/Preferences/types'

class PreferencesController {
  private _PreferencesService: PreferencesService

  constructor(PreferencesService: PreferencesService) {
    this._PreferencesService = PreferencesService
  }

  async GetPreferences(req: GetPreferencesReq, res: Response) {
    const data = await this._PreferencesService.GetPreferences(
      Extractor.ExtractAuthHeader(req).authId
    )
    res.status(200).send(data)
  }

  async GetTheme(req: GetThemeReq, res: Response) {
    const data = await this._PreferencesService.GetTheme(
      Extractor.ExtractAuthHeader(req).authId
    )
    res.status(200).send(data)
  }

  async GetHiddenAccounts(req: GetHiddenAccountsReq, res: Response) {
    const data = await this._PreferencesService.GetHiddenAccounts(
      Extractor.ExtractAuthHeader(req).authId
    )
    res.status(200).send(data)
  }

  async UpdateTheme(req: UpdateThemeReq, res: Response) {
    const data = await this._PreferencesService.UpdateTheme(Extractor.ExtractBody(req))
    res.status(200).send(data)
  }

  async HideAccount(req: HideAccountReq, res: Response) {
    const data = await this._PreferencesService.HideAccount(Extractor.ExtractBody(req))
    res.status(200).send(data)
  }

  async ShowAccount(req: ShowAccountReq, res: Response) {
    const data = await this._PreferencesService.ShowAccount(Extractor.ExtractBody(req))
    res.status(200).send(data)
  }
}

export default PreferencesController
