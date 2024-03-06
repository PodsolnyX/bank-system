import {GetProfileParamsDto} from "./models/GetProfileParamsDto.ts";
import {instance} from "../../api/instance.ts";

class AuthService {
    async getProfile(params: GetProfileParamsDto) {
        return instance.get('/auth/user/', {
            params
        })
    }

    async logout() {
        return instance.post('/auth/user/logout')
    }
}

const authService = new AuthService();

export default authService;