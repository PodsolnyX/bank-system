import { Theme } from 'entities/Preferences'

export type UpdateThemeDto = {
  theme: Theme
}

export type HideAccountDto = {
  accountId: string
}

export type ShowAccountDto = {
  accountId: string
}
