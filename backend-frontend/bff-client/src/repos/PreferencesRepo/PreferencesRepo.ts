import { WithUser } from 'dto/Common'
import {
  GetHiddenAccountsDto,
  GetPreferencesDto,
  GetThemeDto,
  HideAccountDto,
  ShowAccountDto,
  UpdateThemeDto,
} from 'dto/Preferences'
import { Preferences, Theme } from 'entities/Preferences'
import { MongoClient, Db, Collection, Document } from 'mongodb'
import { PreferencesDocument } from 'repos/PreferencesRepo/types'

class PreferencesRepo {
  private _MongoURL = 'mongodb://localhost:27017'
  private _MongoDbName = 'preferences'
  private _MongoDbCollectionName = 'preferences'

  private _DefaultPreferences: Preferences = {
    theme: Theme.Default,
    hiddenAccounts: [],
  }

  private _Db: Db | undefined
  private _Collection: Collection<PreferencesDocument> | undefined
  private _MongoClient: MongoClient | undefined

  constructor() {
    this.GetPreferences = this.GetPreferences.bind(this)
    this.UpdateTheme = this.UpdateTheme.bind(this)
    this.HideAccount = this.HideAccount.bind(this)
    this.ShowAccount = this.ShowAccount.bind(this)
  }

  private async _Init() {
    if (!this._MongoClient) {
      this._MongoClient = new MongoClient(this._MongoURL)
      await this._MongoClient.connect()
      this._Db = this._MongoClient.db(this._MongoDbName)
      this._Collection = this._Db.collection(this._MongoDbCollectionName)
    }
  }

  private async _InsertDefaultPreferences(mail: string) {
    await this._Init()
    await this._Collection?.insertOne({
      mail,
      ...this._DefaultPreferences,
    })
  }

  private async _FetchPreferences(
    mail: string,
    projection?: Document | undefined
  ): Promise<GetPreferencesDto> {
    await this._Init()
    const preferences = await this._Collection?.findOne(
      { mail },
      { projection: projection || { theme: 1, hiddenAccounts: 1, _id: 0 } }
    )
    if (!preferences) {
      await this._InsertDefaultPreferences(mail)
    }
    return preferences || this._DefaultPreferences
  }

  async GetPreferences(mail: string): Promise<GetPreferencesDto> {
    return await this._FetchPreferences(mail)
  }

  async GetTheme(mail: string): Promise<GetThemeDto> {
    return await this._FetchPreferences(mail, { theme: 1, _id: 0 })
  }

  async GetHiddenAccounts(mail: string): Promise<GetHiddenAccountsDto> {
    return await this._FetchPreferences(mail, { hiddenAccounts: 1, _id: 0 })
  }

  async UpdateTheme(theme: WithUser<UpdateThemeDto>): Promise<GetPreferencesDto> {
    await this._Init()
    const { MailCookie: mail, theme: newTheme } = theme
    await this._Collection?.updateOne({ mail }, { $set: { theme: newTheme } })
    return this._FetchPreferences(mail)
  }

  async HideAccount(account: WithUser<HideAccountDto>): Promise<GetPreferencesDto> {
    await this._Init()
    const { MailCookie: mail, accountId } = account
    await this._Collection?.updateOne(
      { mail },
      { $addToSet: { hiddenAccounts: accountId } }
    )
    return this._FetchPreferences(mail)
  }

  async ShowAccount(account: WithUser<ShowAccountDto>): Promise<GetPreferencesDto> {
    await this._Init()
    const { MailCookie: mail, accountId } = account
    await this._Collection?.updateOne({ mail }, { $pull: { hiddenAccounts: accountId } })
    return this._FetchPreferences(mail)
  }
}

export default PreferencesRepo
