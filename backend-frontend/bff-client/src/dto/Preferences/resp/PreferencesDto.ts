import { Preferences } from 'entities/Preferences'

export type GetPreferencesDto = Preferences
export type GetThemeDto = Pick<Preferences, 'theme'>
export type GetHiddenAccountsDto = Pick<Preferences, 'hiddenAccounts'>
