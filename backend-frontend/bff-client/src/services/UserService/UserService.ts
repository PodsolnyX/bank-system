import { IUserService } from "../../controllers";
import { IUserRepository } from "../../services/UserService/IUserRepository";
import { UserRepository } from "../../repositories";

class UserService implements IUserService {
    private _UserRepository;

    constructor(UserRepository: IUserRepository) {
        this._UserRepository = UserRepository

        this.GetProfile = this.GetProfile.bind(this)
    }

    async GetProfile() {
        return await this._UserRepository.GetProfile()
    }
}

export default new UserService(UserRepository)