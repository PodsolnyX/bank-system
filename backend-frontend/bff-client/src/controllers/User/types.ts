import { GetProfileDto, RegisterDto } from 'dto/User'
import { Request } from 'express'

export type GetUserReq = Request<{}, {}, GetProfileDto>
export type RegisterReq = Request<{}, {}, RegisterDto>
