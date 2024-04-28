import { Microservices } from 'common/Microservices'
import { BaseReq } from './BaseAPI'

export class OperationAPI extends BaseReq {
  protected static BASE_URL = Microservices.Operation
}
