import { Response } from 'express'
import { ChargeLoanReq, GetLoanReq, GetLoansReq, RequestLoanReq } from './types'
import { Extractor } from '../lib/Extractor'
import { LoanService } from 'services/LoanService'

class LoanController {
  private _LoanService: LoanService

  constructor(LoanService: LoanService) {
    this._LoanService = LoanService
  }

  async RequestLoan(req: RequestLoanReq, res: Response) {
    const data = await this._LoanService.RequestLoan(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async ChargeLoan(req: ChargeLoanReq, res: Response) {
    const data = await this._LoanService.ChargeLoan(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async GetLoan(req: GetLoanReq, res: Response) {
    const data = await this._LoanService.GetLoan(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }
}

export default LoanController
