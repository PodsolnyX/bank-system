import { RequestLog } from 'common'
import { ObserverRepo } from 'repos/ObserverRepo'

class ObserverService {
  private _ObserverRepo: ObserverRepo

  constructor(ObserverRepo: ObserverRepo) {
    this._ObserverRepo = ObserverRepo
  }

  async Collect(data: RequestLog) {
    return await this._ObserverRepo.Collect(data)
  }
}

export default ObserverService
