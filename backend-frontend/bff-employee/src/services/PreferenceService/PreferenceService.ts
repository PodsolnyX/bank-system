import {AuthInfo} from "common/Auth";
import {Collection, Db, MongoClient} from "mongodb";
import {GetThemeDto, UpdateThemeDto} from "../../dto/Preference";
import {HiddenAccounts, Preferences, Theme} from "../../entities/Preference";
import {ReqError} from "../../common/ReqError";
import {GetPreferencesDto} from "../../dto/Preference/GetPreferencesDto";

export type PreferencesDocument = Preferences & {
  userid: string
}

class PreferencesService {

  private _MongoURL = 'mongodb://root:password@109.107.189.133:27017'
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

  // private async _FetchUsersPreferences(
  //     UsersIds: string[],
  //     projection?: Document | undefined
  // ): Promise<GetPreferencesDto[]> {
  //   await this._Init()
  //   const preferences = await this._Collection?.find(
  //       // { userid: UsersIds },
  //       // { projection: projection || { theme: 1, hiddenAccounts: 1, _id: 0 } }
  //   )
  //   if (!preferences) {
  //     return [];
  //   }
  //   return preferences;
  // }

  async GetTheme(AuthInfo: AuthInfo): Promise<GetThemeDto> {
    // @ts-ignore
    const lox = await this._FetchPreferences(AuthInfo.id, { themeEmployee: 1, _id: 0 })
    console.log(lox)
    return lox;
  }

  // async GetHiddenAccounts(UsersIds: string[]): Promise<HiddenAccounts> {
  //   return await this._FetchUsersPreferences(UsersIds, { hiddenAccounts: 1, _id: 0 })
  // }

  async UpdateTheme(
      theme: UpdateThemeDto,
      AuthInfo: AuthInfo
  ): Promise<GetPreferencesDto> {

    if (
        typeof theme?.theme !== 'string' ||
        !Object.values(Theme).some((v) => v === theme.theme)
    ) {
      throw new ReqError('Wrong theme', 400)
    }


    await this._Init()
    const { theme: newTheme } = theme
    const id = AuthInfo.id
    await this._Collection?.updateOne({ userid: id }, { $set: { themeEmployee: newTheme } })
    return this._FetchPreferences(id)
  }
}

export default PreferencesService