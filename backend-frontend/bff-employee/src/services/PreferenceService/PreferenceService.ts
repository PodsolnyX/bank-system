import {AuthInfo} from "common/Auth";
import {Collection, Db, MongoClient} from "mongodb";
import {GetThemeDto, UpdateThemeDto} from "../../dto/Preference";
import {Preferences, Theme} from "../../entities/Preference";
import {ReqError} from "../../common/ReqError";
import {GetPreferencesDto} from "../../dto/Preference/GetPreferencesDto";

export type PreferencesDocument = Preferences & {
  userid: string
}

class PreferencesService {

  private _MongoURL = 'mongodb://abudabi:ultragiperparol@109.107.189.133:27017'
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

  async GetTheme(AuthInfo: AuthInfo): Promise<GetThemeDto> {
    // @ts-ignore
    const res = await this._FetchPreferences(AuthInfo.id, { themeEmployee: 1, _id: 0 })
    return {theme: res.themeEmployee};
  }

  async GetHiddenAccounts(UsersIds: string[]) {
    await this._Init();
    return this._Collection?.find(
        { userid: { $in: UsersIds} },
        { projection: { userid: 1, hiddenAccounts: 1, _id: 0 } }
    ).toArray();
  }

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
