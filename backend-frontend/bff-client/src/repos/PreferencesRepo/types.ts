import { Preferences } from 'entities/Preferences'

export type PreferencesDocument = Preferences & {
  userid: string
}
