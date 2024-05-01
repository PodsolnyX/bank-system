import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences/req'
import { PreferencesRepo } from 'repos/PreferencesRepo'
import { Theme } from 'entities/Preferences'
import { ReqError } from 'common/ReqError'
import { ReqMetaInfo } from 'common'

class PreferencesService {
  private _PreferencesRepo: PreferencesRepo

  constructor(PreferencesRepo: PreferencesRepo) {
    this._PreferencesRepo = PreferencesRepo
  }

  async GetPreferences(AuthInfo: ReqMetaInfo) {
    return await this._PreferencesRepo.GetPreferences(AuthInfo)
  }

  async GetTheme(AuthInfo: ReqMetaInfo) {
    return await this._PreferencesRepo.GetTheme(AuthInfo)
  }

  async GetHiddenAccounts(AuthInfo: ReqMetaInfo) {
    return await this._PreferencesRepo.GetHiddenAccounts(AuthInfo)
  }

  async UpdateTheme(themeData: UpdateThemeDto, AuthInfo: ReqMetaInfo) {
    if (
      typeof themeData?.theme !== 'string' ||
      !Object.values(Theme).some((v) => v === themeData.theme)
    ) {
      throw new ReqError('Wrong theme', 400)
    }

    return await this._PreferencesRepo.UpdateTheme(themeData, AuthInfo)
  }

  async HideAccount(accountData: HideAccountDto, AuthInfo: ReqMetaInfo) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.HideAccount(accountData, AuthInfo)
  }

  async ShowAccount(accountData: ShowAccountDto, AuthInfo: ReqMetaInfo) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.ShowAccount(accountData, AuthInfo)
  }
}

export default PreferencesService
