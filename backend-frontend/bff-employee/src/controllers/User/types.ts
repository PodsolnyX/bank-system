import { GetProfileDto, GetUserStatusDto, CreateUserDto } from 'dto/User'
import { Request } from 'express'

export type GetUserReq = Request<{}, {}, {}, GetProfileDto>
export type GetUserStatusReq = Request<{}, {}, {}, GetUserStatusDto>
export type RegisterReq = Request<{}, {}, CreateUserDto>
