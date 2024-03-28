import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences/req'
import { PreferencesRepo } from 'repos/PreferencesRepo'
import { Theme } from 'entities/Preferences'
import { ReqError } from 'common/ReqError'
import { AuthInfo } from 'common'

class PreferencesService {
  private _PreferencesRepo: PreferencesRepo

  constructor(PreferencesRepo: PreferencesRepo) {
    this._PreferencesRepo = PreferencesRepo
  }

  async GetPreferences(AuthInfo: AuthInfo) {
    return await this._PreferencesRepo.GetPreferences(AuthInfo)
  }

  async GetTheme(AuthInfo: AuthInfo) {
    return await this._PreferencesRepo.GetTheme(AuthInfo)
  }

  async GetHiddenAccounts(AuthInfo: AuthInfo) {
    return await this._PreferencesRepo.GetHiddenAccounts(AuthInfo)
  }

  async UpdateTheme(themeData: UpdateThemeDto, AuthInfo: AuthInfo) {
    if (
      typeof themeData?.theme !== 'string' ||
      !Object.values(Theme).some((v) => v === themeData.theme)
    ) {
      throw new ReqError('Wrong theme', 400)
    }

    return await this._PreferencesRepo.UpdateTheme(themeData, AuthInfo)
  }

  async HideAccount(accountData: HideAccountDto, AuthInfo: AuthInfo) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.HideAccount(accountData, AuthInfo)
  }

  async ShowAccount(accountData: ShowAccountDto, AuthInfo: AuthInfo) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.ShowAccount(accountData, AuthInfo)
  }
}

export default PreferencesService
