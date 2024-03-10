import {Pagination} from "../common/Pagination.ts";
import {SearchUsersDto} from "./models/SearchUsersDto.ts";

export const authQueryKeys = {
    profile: () => ["GET_PROFILE"],
    userInfo: (id?: string) => ["GET_USER_INFO", id],
    users: (params: Pagination<SearchUsersDto>) => ["GET_USERS", params]
}