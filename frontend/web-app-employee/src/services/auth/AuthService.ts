import {GetProfileParamsDto} from "./models/GetProfileParamsDto.ts";
import {instance} from "../../api/instance.ts";
import {UserDto} from "./models/UserDto.ts";
import {SearchUsersDto} from "./models/SearchUsersDto.ts";
import {Pagination} from "../common/Pagination.ts";

class AuthService {
    async getProfile(params: GetProfileParamsDto) {
        return instance.get('/auth/user/', {
            params
        })
    }

    async getUsers(params: Pagination<SearchUsersDto>) {
        return instance.get<UserDto[]>('/auth/user/users/', {
            params: params
        })
    }
    async logout() {
        return instance.post('/auth/user/logout')
    }

    async banUser(id: string) {
        return instance.post(`/auth/user/${id}/ban`)
    }
}

const authService = new AuthService();

export default authService;