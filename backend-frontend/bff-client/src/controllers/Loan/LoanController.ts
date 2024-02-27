import { Request, Response } from "express";
import { ILoanService } from "./ILoanService";

class LoanController {
    private _LoanService: ILoanService

    constructor(LoanService: ILoanService) {
        this._LoanService = LoanService
    }

    async RequestLoan(req: Request, res: Response) {
        const data = await this._LoanService.RequestLoan()
        res.status(200).send(data) 
    }

    async ChargeLoan(req: Request, res: Response) {
        const data = await this._LoanService.ChargeLoan()
        res.status(200).send(data) 
    }

    async GetTariffs(req: Request, res: Response) {
        const data = await this._LoanService.GetTariffs()
        res.status(200).send(data) 
    }

    async GetLoans(req: Request, res: Response) {
        const data = await this._LoanService.GetLoans()
        res.status(200).send(data) 
    }
}

export default LoanController