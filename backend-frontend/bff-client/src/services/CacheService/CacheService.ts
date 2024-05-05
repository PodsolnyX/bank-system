import { PreCachedQuery } from 'common'
import { CacheRepo } from 'repos/CacheRepo'

class CacheService {
  private _CacheRepo: CacheRepo

  constructor(CacheRepo: CacheRepo) {
    this._CacheRepo = CacheRepo
  }

  async Get(key: string) {
    return await this._CacheRepo.Get(key)
  }

  async Insert(query: PreCachedQuery) {
    try {
      return await this._CacheRepo.Insert({
        ...query,
        data: JSON.stringify(query.data),
        status: query.status || 200,
      })
    } catch {}
  }
}

export default CacheService
