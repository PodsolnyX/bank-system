import { MongoClient, Db, Collection, Document } from 'mongodb'

import {
  GetHiddenAccountsDto,
  GetPreferencesDto,
  GetThemeDto,
  HideAccountDto,
  ShowAccountDto,
  UpdateThemeDto,
} from 'dto/Preferences'
import { Preferences, Theme } from 'entities/Preferences'
import { PreferencesDocument } from 'repos/PreferencesRepo/types'
import { AuthData } from 'common'

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

  private async _Init() {
    if (!this._MongoClient) {
      this._MongoClient = new MongoClient(this._MongoURL)
      await this._MongoClient.connect()
      this._Db = this._MongoClient.db(this._MongoDbName)
      this._Collection = this._Db.collection(this._MongoDbCollectionName)
    }
  }

  private async _InsertDefaultPreferences(id: string) {
    await this._Init()
    try {
      await this._Collection?.insertOne({
        userid: id,
        ...this._DefaultPreferences,
      })
    } catch {}
  }

  private async _FetchPreferences(
    id: string,
    projection?: Document | undefined
  ): Promise<GetPreferencesDto> {
    await this._Init()
    const preferences = await this._Collection?.findOne(
      { userid: id },
      { projection: projection || { theme: 1, hiddenAccounts: 1, _id: 0 } }
    )
    if (!preferences) {
      await this._InsertDefaultPreferences(id)
    }
    return preferences || this._DefaultPreferences
  }

  async GetPreferences(): Promise<GetPreferencesDto> {
    return await this._FetchPreferences(AuthData.Id)
  }

  async GetTheme(): Promise<GetThemeDto> {
    return await this._FetchPreferences(AuthData.Id, { theme: 1, _id: 0 })
  }

  async GetHiddenAccounts(): Promise<GetHiddenAccountsDto> {
    return await this._FetchPreferences(AuthData.Id, { hiddenAccounts: 1, _id: 0 })
  }

  async UpdateTheme(theme: UpdateThemeDto): Promise<GetPreferencesDto> {
    await this._Init()
    const { theme: newTheme } = theme
    const id = AuthData.Id
    await this._Collection?.updateOne({ userid: id }, { $set: { theme: newTheme } })
    return this._FetchPreferences(id)
  }

  async HideAccount(account: HideAccountDto): Promise<GetPreferencesDto> {
    await this._Init()
    const { accountId } = account
    const id = AuthData.Id
    await this._Collection?.updateOne(
      { userid: id },
      { $addToSet: { hiddenAccounts: accountId } }
    )
    return this._FetchPreferences(id)
  }

  async ShowAccount(account: ShowAccountDto): Promise<GetPreferencesDto> {
    await this._Init()
    const { accountId } = account
    const id = AuthData.Id
    await this._Collection?.updateOne(
      { userid: id },
      { $pull: { hiddenAccounts: accountId } }
    )
    return this._FetchPreferences(id)
  }
}

export default PreferencesRepo
