export enum Theme {
  Default = 'Default',
  Dark = 'Dark',
}

export type Preferences = {
  theme: Theme
  hiddenAccounts: string[]
}
