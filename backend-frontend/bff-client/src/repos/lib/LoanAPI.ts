import { Microservices } from 'common/Microservices'
import { BaseReq } from './BaseAPI'

export class LoanAPI extends BaseReq {
  protected static BASE_URL = Microservices.Loan
}
