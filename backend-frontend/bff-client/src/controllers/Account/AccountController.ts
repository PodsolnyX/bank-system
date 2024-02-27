import { Request, Response } from "express";
import { IAccountService } from "./IAccountService";

class AccountController {
    private _AccountService: IAccountService

    constructor(AccountService: IAccountService) {
        this._AccountService = AccountService
    }

    async OpenAccount(req: Request, res: Response) {
        const data = await this._AccountService.OpenAccount()
        res.status(200).send(data) 
    }

    async CloseAccount(req: Request, res: Response) {
        const data = await this._AccountService.CloseAccount()
        res.status(200).send(data) 
    }

    async GetAccounts(req: Request, res: Response) {
        const data = await this._AccountService.GetAccounts()
        res.status(200).send(data) 
    }

    async GetAccount(req: Request, res: Response) {
        const data = await this._AccountService.GetAccount()
        res.status(200).send(data) 
    }

    async Deposit(req: Request, res: Response) {
        const data = await this._AccountService.Deposit()
        res.status(200).send(data) 
    }

    async Withdraw(req: Request, res: Response) {
        const data = await this._AccountService.Withdraw()
        res.status(200).send(data) 
    }
}

export default AccountController