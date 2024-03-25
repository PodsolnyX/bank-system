import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences'
import { PreferencesRepo } from 'repos/PreferencesRepo'
import { Theme } from 'entities/Preferences'
import { ReqError } from 'common/ReqError'

class PreferencesService {
  private _PreferencesRepo: PreferencesRepo

  constructor(PreferencesRepo: PreferencesRepo) {
    this._PreferencesRepo = PreferencesRepo
  }

  async GetPreferences() {
    return await this._PreferencesRepo.GetPreferences()
  }

  async GetTheme() {
    return await this._PreferencesRepo.GetTheme()
  }

  async GetHiddenAccounts() {
    return await this._PreferencesRepo.GetHiddenAccounts()
  }

  async UpdateTheme(themeData: UpdateThemeDto) {
    if (
      typeof themeData?.theme !== 'string' ||
      !Object.values(Theme).some((v) => v === themeData.theme)
    ) {
      throw new ReqError('Wrong theme', 400)
    }

    return await this._PreferencesRepo.UpdateTheme(themeData)
  }

  async HideAccount(accountData: HideAccountDto) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.HideAccount(accountData)
  }

  async ShowAccount(accountData: ShowAccountDto) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.ShowAccount(accountData)
  }
}

export default PreferencesService
