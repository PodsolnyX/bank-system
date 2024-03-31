import { Request, Response } from 'express'
import { ChargeLoanReq, GetLoansReq, GetPaymentsReq, RequestLoanReq } from './types'

import { LoanService } from 'services/LoanService'
import { AuthHelper } from 'common'

class LoanController {
  private _LoanService: LoanService

  constructor(LoanService: LoanService) {
    this._LoanService = LoanService
  }

  async RequestLoan(req: RequestLoanReq, res: Response) {
    const data = await this._LoanService.RequestLoan(req.query, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async ChargeLoan(req: ChargeLoanReq, res: Response) {
    const data = await this._LoanService.ChargeLoan(
      {
        ...req.params,
        ...req.query,
      },
      AuthHelper.Data(req)
    )
    res.status(200).send(data)
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(req.query, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetPayments(req: GetPaymentsReq, res: Response) {
    const data = await this._LoanService.GetPayments(req.query, AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async GetRating(req: Request, res: Response) {
    const rating = await this._LoanService.GetRating(AuthHelper.Data(req))
    res.status(200).send({ rating })
  }

  async ExecuteJob(req: Request, res: Response) {
    await this._LoanService.ExecuteJob(AuthHelper.Data(req))
    res.sendStatus(200)
  }
}

export default LoanController
