import {GetProfileDto, GetUserStatusDto, UserCreateDto, UserBanDto} from 'dto/User'
import { Request } from 'express'
import {PaginationReq} from "../../dto/Common";
import {SearchUserDto} from "../../dto/User/SearchUserDto";

export type GetUserReq = Request<{}, {}, {}, GetProfileDto>
export type GetUsersReq = Request<{}, {}, {}, PaginationReq<SearchUserDto>>
export type GetUserStatusReq = Request<{}, {}, {}, GetUserStatusDto>
export type CreateUserReq = Request<{}, {}, {}, UserCreateDto>
export type BanUserReq = Request<UserBanDto>
