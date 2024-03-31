import { GetAccessDto } from 'dto/User/req'
import { Request } from 'express'

export type GetAccessInfoReq = Request<GetAccessDto>
