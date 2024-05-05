import { Request, Response } from 'express'
import { ChargeLoanReq, GetLoansReq, GetPaymentsReq, RequestLoanReq } from './types'

import { LoanService } from 'services/LoanService'
import { ReqHelper } from 'common'
import { CacheService } from 'services/CacheService'
import { ObserverService } from 'services/ObserverService'

class LoanController {
  private _LoanService: LoanService
  private _CacheService: CacheService
  private _ObserverService: ObserverService

  constructor(LoanService: LoanService, CacheService: CacheService, ObserverService: ObserverService) {
    this._LoanService = LoanService
    this._CacheService = CacheService
    this._ObserverService = ObserverService
  }

  async RequestLoan(req: RequestLoanReq, res: Response) {
    const data = await this._LoanService.RequestLoan(req.query, ReqHelper.AuthData(req))
    await this._CacheService.Insert({ data, key: ReqHelper.XKey(req) })
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
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
    this._ObserverService.Collect(req, 200)
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(req.query, ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async GetPayments(req: GetPaymentsReq, res: Response) {
    const data = await this._LoanService.GetPayments(req.query, ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200)
  }

  async GetRating(req: Request, res: Response) {
    const rating = await this._LoanService.GetRating(ReqHelper.AuthData(req))
    res.status(200).send({ rating })
    this._ObserverService.Collect(req, 200)
  }

  async ExecuteJob(req: Request, res: Response) {
    await this._LoanService.ExecuteJob(ReqHelper.AuthData(req))
    await this._CacheService.Insert({ data: null, key: ReqHelper.XKey(req) })
    res.sendStatus(200)
    this._ObserverService.Collect(req, 200)
  }
}

export default LoanController
