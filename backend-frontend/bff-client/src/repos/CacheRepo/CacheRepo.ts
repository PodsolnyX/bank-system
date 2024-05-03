import { MongoClient, Db, Collection } from 'mongodb'
import { CachedQueryDbRecord, CachedQuery, CachedQueryInfoResp } from 'common'
import { MONGO_URL } from 'common/config'

class CacheRepo {
  private _MongoURL = MONGO_URL
  private _MongoDbName = 'cache'
  private _MongoDbCollectionName = 'resp'

  private _Db: Db | undefined
  private _Collection: Collection<CachedQueryDbRecord> | undefined
  private _MongoClient: MongoClient | undefined

  private readonly _DateDiff = 1000 * 5

  private async _Init() {
    if (!this._MongoClient) {
      this._MongoClient = new MongoClient(this._MongoURL)
      await this._MongoClient.connect()
      this._Db = this._MongoClient.db(this._MongoDbName)
      this._Collection = this._Db.collection(this._MongoDbCollectionName)
    }
  }

  private _IsExpired(timestamp: number) {
    return Date.now() > timestamp + this._DateDiff
  }

  private async _Remove(key: string): Promise<void> {
    await this._Init()
    await this._Collection?.deleteMany({ key })
  }

  async Get(key: string): Promise<CachedQueryInfoResp> {
    await this._Init()
    const data = await this._Collection?.findOne(
      { key },
      { projection: { status: 1, data: 1, _id: 0 } }
    )
    const { timestamp } = data || {}
    if (timestamp && this._IsExpired(timestamp)) {
      this._Remove(key)
      return null
    }
    return data
  }

  async Insert(query: CachedQuery): Promise<void> {
    await this._Init()
    await this._Remove(query.key)
    await this._Collection?.insertOne({
      ...query,
      timestamp: Date.now(),
    })
  }
}

export default CacheRepo
