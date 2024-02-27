import { GetProfileDto } from 'dto/User'
import { Request } from 'express'

export type GetUserReq = Request<{}, {}, GetProfileDto>
