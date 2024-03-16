import { Request } from 'express'
import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences'

export type GetPreferencesReq = Request<any>
export type UpdateThemeReq = Request<{}, {}, UpdateThemeDto>
export type HideAccountReq = Request<{}, {}, HideAccountDto>
export type ShowAccountReq = Request<{}, {}, ShowAccountDto>
