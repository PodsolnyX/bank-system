import { IOperationHistoryService } from "controllers/OperationHistory";
import { IOperationHistoryRepo } from "services/OperationHistoryService";

class OperationHistoryService implements IOperationHistoryService {
    private _OperationHistoryRepo;

    constructor(OperationHistoryRepo: IOperationHistoryRepo) {
        this._OperationHistoryRepo = OperationHistoryRepo

        this.GetProfile = this.GetProfile.bind(this)
    }

    async GetProfile() {
        return await this._OperationHistoryRepo.GetProfile()
    }
}

export default OperationHistoryService;