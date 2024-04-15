import { Request, Response } from 'express'
import { ChargeLoanReq, GetLoansReq, GetPaymentsReq, RequestLoanReq } from './types'

import { LoanService } from 'services/LoanService'
import { ReqHelper } from 'common'
import { CacheService } from 'services/CacheService'

class LoanController {
  private _LoanService: LoanService
  private _CacheService: CacheService

  constructor(LoanService: LoanService, CacheService: CacheService) {
    this._LoanService = LoanService
    this._CacheService = CacheService
  }

  async RequestLoan(req: RequestLoanReq, res: Response) {
    const data = await this._LoanService.RequestLoan(req.query, ReqHelper.AuthData(req))
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
  }

  async ChargeLoan(req: ChargeLoanReq, res: Response) {
    const data = await this._LoanService.ChargeLoan(
      {
        ...req.params,
        ...req.query,
      },
      ReqHelper.AuthData(req)
    )
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(req.query, ReqHelper.AuthData(req))
    res.status(200).send(data)
  }

  async GetPayments(req: GetPaymentsReq, res: Response) {
    const data = await this._LoanService.GetPayments(req.query, ReqHelper.AuthData(req))
    res.status(200).send(data)
  }

  async GetRating(req: Request, res: Response) {
    const rating = await this._LoanService.GetRating(ReqHelper.AuthData(req))
    res.status(200).send({ rating })
  }

  async ExecuteJob(req: Request, res: Response) {
    await this._LoanService.ExecuteJob(ReqHelper.AuthData(req))
    await this._CacheService.Insert({ data: null, key: ReqHelper.XKey(req) })
    res.sendStatus(200)
  }
}

export default LoanController
