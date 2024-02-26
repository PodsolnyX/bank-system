import { IUserService } from "controllers/User";
import { IUserRepo } from "services/UserService";
class UserService implements IUserService {
    private _UserRepository;

    constructor(UserRepository: IUserRepo) {
        this._UserRepository = UserRepository

        this.GetProfile = this.GetProfile.bind(this)
    }

    async GetProfile() {
        return await this._UserRepository.GetProfile()
    }
}

export default UserService;