import { Preferences, Theme } from '../model'

export type GetPreferencesReq = void
export type GetPreferencesResp = Preferences

export type GetThemeReq = void
export type GetThemeResp = Pick<Preferences, 'theme'>

export type GetHiddenAccountsReq = void
export type GetHiddenAccountsResp = Pick<Preferences, 'hiddenAccounts'>

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
