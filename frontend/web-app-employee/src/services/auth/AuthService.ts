import {GetProfileParamsDto} from "./models/GetProfileParamsDto.ts";
import {instance} from "../../shared/api/instance.ts";
import {UserDto} from "./models/UserDto.ts";
import {SearchUsersDto} from "./models/SearchUsersDto.ts";
import {Pagination} from "../common/Pagination.ts";
import {UserCreateDto} from "./models/UserCreateDto.ts";
import {UserInfoDto} from "./models/UserInfoDto.ts";
import {ThemeDto} from "./models/ThemeDto.ts";

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

    async createUser(data: UserCreateDto, key: string) {
        return instance.post('/auth/user/create', data, {
            headers: { "X-Idempotency-Key": key }
        })
    }
    async logout() {
        return instance.post('/auth/user/logout')
    }

    async banUser(id: string, key: string) {
        return instance.delete(`/auth/user/${id}/ban`, {
            headers: { "X-Idempotency-Key": key }
        })
    }

    async unbanUser(id: string, key: string) {
        return instance.post(`/auth/user/${id}/unban`, {
            headers: { "X-Idempotency-Key": key }
        })
    }

    async getTheme() {
        return instance.get<ThemeDto>("/preference/employee/theme")
    }

    async updateTheme(data: ThemeDto, key: string) {
        return instance.post("/preference/employee/theme", data, {
            headers: { "X-Idempotency-Key": key }
        })
    }
}

const authService = new AuthService();

export default authService;