import { User } from 'shared/entities'

export type GetProfileReq = string | null
export type GetProfileResp = User

export type LogoutReq = void
export type LogoutResp = void
