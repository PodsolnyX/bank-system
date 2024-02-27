import { Request, Response } from "express";
import { IAccountService } from "./IAccountService";

class AccountController {
    private _AccountService: IAccountService

    constructor(AccountService: IAccountService) {
        this._AccountService = AccountService
    }

    async GetProfile(_req: Request, res: Response): Promise<void> {
        const t = await this._AccountService.GetProfile()
        res.status(200).send(t) 
    }
}

export default AccountController