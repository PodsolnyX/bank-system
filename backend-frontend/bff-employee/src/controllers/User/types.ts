import {GetProfileDto, GetUserStatusDto, UserCreateDto, UserBanDto} from 'dto/User'
import { Request } from 'express'

export type GetUserReq = Request<{}, {}, {}, GetProfileDto>
export type GetUserStatusReq = Request<{}, {}, {}, GetUserStatusDto>
export type CreateUserReq = Request<{}, {}, {}, UserCreateDto>
export type BanUserReq = Request<UserBanDto>
