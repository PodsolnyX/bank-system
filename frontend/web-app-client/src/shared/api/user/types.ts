import { User } from 'shared/entities'

export type GetProfileReq = string | null
export type GetProfileResp = User

export type GetStatusReq = string | null
export type GetStatusResp = User

export type LogoutReq = void
export type LogoutResp = void

export type RegisterReq = {
  name: string
  mail: string
}
export type RegisterResp = {
  id: string
}
