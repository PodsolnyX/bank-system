import { Response } from 'express'
import { ILoanService } from './ILoanService'
import {
  ChargeLoanReq,
  GetLoanReq,
  GetLoansReq,
  GetTariffsReq,
  RequestLoanReq,
} from './types'

class LoanController {
  private _LoanService: ILoanService

  constructor(LoanService: ILoanService) {
    this._LoanService = LoanService
  }

  async RequestLoan(req: RequestLoanReq, res: Response) {
    const data = await this._LoanService.RequestLoan(req.body)
    res.status(200).send(data)
  }

  async ChargeLoan(req: ChargeLoanReq, res: Response) {
    const data = await this._LoanService.ChargeLoan(req.body)
    res.status(200).send(data)
  }

  async GetTariffs(req: GetTariffsReq, res: Response) {
    const data = await this._LoanService.GetTariffs(req.body)
    res.status(200).send(data)
  }

  async GetLoans(req: GetLoansReq, res: Response) {
    const data = await this._LoanService.GetLoans(req.body)
    res.status(200).send(data)
  }

  async GetLoan(req: GetLoanReq, res: Response) {
    const data = await this._LoanService.GetLoan(req.body)
    res.status(200).send(data)
  }
}

export default LoanController
