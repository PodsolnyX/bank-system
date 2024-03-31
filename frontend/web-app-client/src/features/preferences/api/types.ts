import { Preferences, Theme } from 'entities/preferences'

export type UpdateThemeReq = {
  theme: Theme
}
export type UpdateThemeResp = Preferences

export type HideAccountReq = {
  accountId: string
}
export type HideAccountResp = Preferences

export type ShowAccountReq = {
  accountId: string
}
export type ShowAccountResp = Preferences
