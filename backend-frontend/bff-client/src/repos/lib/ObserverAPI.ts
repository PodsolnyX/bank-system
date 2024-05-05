import { Microservices } from 'common/Microservices'
import { BaseReq } from './BaseAPI'

export class ObserverAPI extends BaseReq {
  protected static BASE_URL = Microservices.Observer
}
