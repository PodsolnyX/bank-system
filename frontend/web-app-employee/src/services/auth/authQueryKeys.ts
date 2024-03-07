import {Pagination} from "../common/Pagination.ts";
import {SearchUsersDto} from "./models/SearchUsersDto.ts";

export const authQueryKeys = {
    profile: () => ["GET_PROFILE"],
    users: (params: Pagination<SearchUsersDto>) => ["GET_USERS", params]
}