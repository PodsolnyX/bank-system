import { Request, Response } from 'express'
import { ChargeLoanReq, GetLoansReq, GetPaymentsReq, RequestLoanReq } from './types'

import { LoanService } from 'services/LoanService'

class LoanController {
  private _LoanService: LoanService

  constructor(LoanService: LoanService) {
    this._LoanService = LoanService
  }

  async RequestLoan(req: RequestLoanReq, res: Response) {
    const data = await this._LoanService.RequestLoan(req.query)
    res.status(200).send(data)
  }

  async ChargeLoan(req: ChargeLoanReq, res: Response) {
    const data = await this._LoanService.ChargeLoan({
      ...req.params,
      ...req.query,
    })
    res.status(200).send(data)
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(req.query)
    res.status(200).send(data)
  }

  async GetPayments(req: GetPaymentsReq, res: Response) {
    const data = await this._LoanService.GetPayments(req.query)
    res.status(200).send(data)
  }

  async GetRating(_req: Request, res: Response) {
    const rating = await this._LoanService.GetRating()
    res.status(200).send({ rating })
  }

  async ExecuteJob(_req: Request, res: Response) {
    await this._LoanService.ExecuteJob()
    res.sendStatus(200)
  }
}

export default LoanController
