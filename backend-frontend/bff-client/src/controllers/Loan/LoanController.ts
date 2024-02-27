import { Request, Response } from "express";
import { ILoanService } from "./ILoanService";

class LoanController {
    private _LoanService: ILoanService

    constructor(LoanService: ILoanService) {
        this._LoanService = LoanService
    }

    async GetProfile(_req: Request, res: Response): Promise<void> {
        const t = await this._LoanService.GetProfile()
        res.status(200).send(t) 
    }
}

export default LoanController