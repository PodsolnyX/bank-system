import { Request, Response } from "express";
import { IOperationHistoryService } from "./IOperationHistoryService";

class OperationHistoryController {
    private _OperationHistoryService: IOperationHistoryService

    constructor(OperationHistoryService: IOperationHistoryService) {
        this._OperationHistoryService = OperationHistoryService
    }

    async GetProfile(_req: Request, res: Response): Promise<void> {
        const t = await this._OperationHistoryService.GetProfile()
        res.status(200).send(t) 
    }
}

export default OperationHistoryController