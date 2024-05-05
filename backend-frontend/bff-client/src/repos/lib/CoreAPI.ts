import { Microservices } from 'common/Microservices'
import { BaseReq } from './BaseAPI'

export class CoreAPI extends BaseReq {
  protected static BASE_URL = Microservices.Core
}
