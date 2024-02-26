import { Request, Response } from "express";
import { IUserService } from "controllers/User/IUserService";
import UserService from "../../services/UserService/UserService";

class UserController {
    private _UserService: IUserService

    constructor(UserService: IUserService) {
        this._UserService = UserService
    }

    async GetProfile(_req: Request, res: Response): Promise<void> {
        const t = await this._UserService.GetProfile()
        res.status(200).send(t) 
    }
}

export default new UserController(UserService)