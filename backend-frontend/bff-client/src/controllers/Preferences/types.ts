import { Request } from 'express'
import { HideAccountDto, ShowAccountDto, UpdateThemeDto } from 'dto/Preferences/req'

export type GetPreferencesReq = Request<any>
export type GetThemeReq = Request<any>
export type GetHiddenAccountsReq = Request<any>

export type UpdateThemeReq = Request<{}, {}, UpdateThemeDto>
export type HideAccountReq = Request<{}, {}, HideAccountDto>
export type ShowAccountReq = Request<{}, {}, ShowAccountDto>
