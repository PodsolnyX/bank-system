import {GetProfileParamsDto} from "./models/GetProfileParamsDto.ts";
import {instance} from "../../api/instance.ts";
import {UserDto} from "./models/UserDto.ts";

class AuthService {
    async getProfile(params: GetProfileParamsDto) {
        return instance.get('/auth/user/', {
            params
        })
    }

    async getUsers() {
        return instance.get<UserDto[]>('/auth/user/users/' )
    }
    async logout() {
        return instance.post('/auth/user/logout')
    }
}

const authService = new AuthService();

export default authService;