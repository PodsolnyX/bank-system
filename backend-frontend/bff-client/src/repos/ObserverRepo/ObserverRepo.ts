import { RequestLog } from 'common'
import { ObserverAPI } from 'repos/lib/ObserverAPI'

class ObserverRepo {
  async Collect(data: RequestLog) {
    return (await ObserverAPI.Req().post<void>('/http', data)).data
  }
}

export default ObserverRepo
