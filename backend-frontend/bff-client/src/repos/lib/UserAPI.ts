import { Microservices } from 'common/Microservices'
import { BaseReq } from './BaseAPI'

export class UserAPI extends BaseReq {
  protected static BASE_URL = Microservices.User
}
