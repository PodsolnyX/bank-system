import { Request, Response } from 'express'
import { ChargeLoanReq, GetLoansReq, GetPaymentsReq, RequestLoanReq } from './types'
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

  async GetPayments(req: GetPaymentsReq, res: Response) {
    const data = await this._LoanService.GetPayments(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }

  async ExecuteJob(_req: Request, res: Response) {
    const data = await this._LoanService.ExecuteJob()
    res.status(200).send(data)
  }
}

export default LoanController
