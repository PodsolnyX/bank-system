import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences'
import { WithUser } from 'dto/Common'
import { PreferencesRepo } from 'repos/PreferencesRepo'
import { Theme } from 'entities/Preferences'
import { ReqError } from 'common/ReqError'

class PreferencesService {
  private _PreferencesRepo: PreferencesRepo

  constructor(PreferencesRepo: PreferencesRepo) {
    this._PreferencesRepo = PreferencesRepo

    this.GetPreferences = this.GetPreferences.bind(this)
    this.GetTheme = this.GetTheme.bind(this)
    this.GetHiddenAccounts = this.GetHiddenAccounts.bind(this)
    this.UpdateTheme = this.UpdateTheme.bind(this)
    this.HideAccount = this.HideAccount.bind(this)
    this.ShowAccount = this.ShowAccount.bind(this)
  }

  async GetPreferences(mail: string) {
    return await this._PreferencesRepo.GetPreferences(mail)
  }

  async GetTheme(mail: string) {
    return await this._PreferencesRepo.GetTheme(mail)
  }

  async GetHiddenAccounts(mail: string) {
    return await this._PreferencesRepo.GetHiddenAccounts(mail)
  }

  async UpdateTheme(themeData: WithUser<UpdateThemeDto>) {
    if (
      typeof themeData?.theme !== 'string' ||
      !Object.values(Theme).some((v) => v === themeData.theme)
    ) {
      throw new ReqError('Wrong theme', 400)
    }

    return await this._PreferencesRepo.UpdateTheme(themeData)
  }

  async HideAccount(accountData: WithUser<HideAccountDto>) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.HideAccount(accountData)
  }

  async ShowAccount(accountData: WithUser<ShowAccountDto>) {
    if (typeof accountData?.accountId !== 'string') {
      throw new ReqError('Wrong accountId value', 400)
    }

    return await this._PreferencesRepo.ShowAccount(accountData)
  }
}

export default PreferencesService
