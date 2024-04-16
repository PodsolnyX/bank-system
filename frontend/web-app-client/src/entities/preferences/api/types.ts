import { Preferences } from '../model'

export type GetPreferencesReq = void
export type GetPreferencesResp = Preferences

export type GetThemeReq = void
export type GetThemeResp = Pick<Preferences, 'theme'>

export type GetHiddenAccountsReq = void
export type GetHiddenAccountsResp = Pick<Preferences, 'hiddenAccounts'>