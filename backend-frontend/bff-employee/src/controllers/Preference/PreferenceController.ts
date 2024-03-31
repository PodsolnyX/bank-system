import { Response } from 'express'
import {
    GetThemeReq,
    UpdateThemeReq,
} from './types'
import { AuthHelper } from 'common/Auth'
import PreferencesService from "../../services/PreferenceService/PreferenceService";

class PreferencesController {
    private _PreferencesService: PreferencesService

    constructor(PreferencesService: PreferencesService) {
        this._PreferencesService = PreferencesService
    }

    async GetTheme(req: GetThemeReq, res: Response) {
        const data = await this._PreferencesService.GetTheme(AuthHelper.Data(req))
        res.status(200).send(data)
    }

    async UpdateTheme(req: UpdateThemeReq, res: Response) {
        const data = await this._PreferencesService.UpdateTheme(
            req.body,
            AuthHelper.Data(req)
        )
        res.status(200).send(data)
    }
}

export default PreferencesController