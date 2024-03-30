import {GetProfileParamsDto} from "./models/GetProfileParamsDto.ts";
import {instance} from "../../shared/api/instance.ts";
import {UserDto} from "./models/UserDto.ts";
import {SearchUsersDto} from "./models/SearchUsersDto.ts";
import {Pagination} from "../common/Pagination.ts";
import {UserCreateDto} from "./models/UserCreateDto.ts";
import {UserInfoDto} from "./models/UserInfoDto.ts";

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

    async getUserInfo(id: string) {
        return instance.get<UserInfoDto>(`/auth/user/user/${id}`)
    }

    async createUser(data: UserCreateDto) {
        return instance.post('/auth/user/create', data)
    }
    async logout() {
        return instance.post('/auth/user/logout')
    }

    async banUser(id: string) {
        return instance.post(`/auth/user/${id}/ban`)
    }

    async getTheme() {
        return instance.get<{theme: string}>("/preference/employee/theme")
    }
}

const authService = new AuthService();

export default authService;