import { CacheService } from 'services/CacheService'
import { CacheRepo } from 'repos/CacheRepo'

export const CacheRepositoryInst = new CacheRepo()
export const CacheServiceInst = new CacheService(CacheRepositoryInst)
