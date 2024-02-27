import { IUserService } from "controllers/User";
import { IUserRepo } from "services/UserService";

class UserService implements IUserService {
    private _UserRepo;

    constructor(UserRepo: IUserRepo) {
        this._UserRepo = UserRepo

        this.GetProfile = this.GetProfile.bind(this)
    }

    async GetProfile() {
        return await this._UserRepo.GetProfile()
    }
}

export default UserService;