import { Response } from 'express'
import {GetLoanReq, GetLoansReq, GetUserPaymentsReq} from './types'
import { Extractor } from '../lib/Extractor'
import { LoanService } from 'services/LoanService'
import {AuthHelper} from "../../common/Auth";

class LoanController {
  private _LoanService: LoanService

  constructor(LoanService: LoanService) {
    this._LoanService = LoanService
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetLoan(req: GetLoanReq, res: Response) {
    const data = await this._LoanService.GetLoan(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetUserPayments(req: GetUserPaymentsReq, res: Response) {
    const data = await this._LoanService.GetUserPayments(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }
}

export default LoanController
