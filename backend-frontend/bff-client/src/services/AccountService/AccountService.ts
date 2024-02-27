import { IAccountService } from "controllers/Account";
import { IAccountRepo } from "services/AccountService";

class AccountService implements IAccountService {
    private _AccountRepo;

    constructor(AccountRepo: IAccountRepo) {
        this._AccountRepo = AccountRepo

        this.GetProfile = this.GetProfile.bind(this)
    }

    async GetProfile() {
        return await this._AccountRepo.GetProfile()
    }
}

export default AccountService;