import { ILoanService } from "controllers/Loan";
import { ILoanRepo } from "services/LoanService";

class LoanService implements ILoanService {
    private _LoanRepo;

    constructor(LoanRepo: ILoanRepo) {
        this._LoanRepo = LoanRepo

        this.GetProfile = this.GetProfile.bind(this)
    }

    async GetProfile() {
        return await this._LoanRepo.GetProfile()
    }
}

export default LoanService;