import { MongoClient, Db, Collection, Document } from 'mongodb'

import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences/req'
import {
  GetHiddenAccountsDto,
  GetPreferencesDto,
  GetThemeDto,
} from 'dto/Preferences/resp'
import { Preferences, Theme } from 'entities/Preferences'
import { PreferencesDocument } from 'repos/PreferencesRepo/types'
import { ReqMetaInfo } from 'common'
import { MONGO_URL } from 'common/config'

class PreferencesRepo {
  private _MongoURL = MONGO_URL
  private _MongoDbName = 'preferences'
  private _MongoDbCollectionName = 'preferences'

  private _DefaultPreferences: Preferences = {
    theme: Theme.Default,
    themeEmployee: Theme.Default,
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

  async GetPreferences(AuthInfo: ReqMetaInfo): Promise<GetPreferencesDto> {
    return await this._FetchPreferences(AuthInfo.id)
  }

  async GetTheme(AuthInfo: ReqMetaInfo): Promise<GetThemeDto> {
    return await this._FetchPreferences(AuthInfo.id, { theme: 1, _id: 0 })
  }

  async GetHiddenAccounts(AuthInfo: ReqMetaInfo): Promise<GetHiddenAccountsDto> {
    return await this._FetchPreferences(AuthInfo.id, { hiddenAccounts: 1, _id: 0 })
  }

  async UpdateTheme(
    theme: UpdateThemeDto,
    AuthInfo: ReqMetaInfo
  ): Promise<GetPreferencesDto> {
    await this._Init()
    const { theme: newTheme } = theme
    const id = AuthInfo.id
    await this._Collection?.updateOne({ userid: id }, { $set: { theme: newTheme } })
    return this._FetchPreferences(id)
  }

  async HideAccount(
    account: HideAccountDto,
    AuthInfo: ReqMetaInfo
  ): Promise<GetPreferencesDto> {
    await this._Init()
    const { accountId } = account
    const id = AuthInfo.id
    await this._Collection?.updateOne(
      { userid: id },
      { $addToSet: { hiddenAccounts: accountId } }
    )
    return this._FetchPreferences(id)
  }

  async ShowAccount(
    account: ShowAccountDto,
    AuthInfo: ReqMetaInfo
  ): Promise<GetPreferencesDto> {
    await this._Init()
    const { accountId } = account
    const id = AuthInfo.id
    await this._Collection?.updateOne(
      { userid: id },
      { $pull: { hiddenAccounts: accountId } }
    )
    return this._FetchPreferences(id)
  }
}

export default PreferencesRepo
