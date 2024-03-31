export enum Theme {
    Default = 'Default',
    Dark = 'Dark',
}

export type HiddenAccounts = {
    hiddenAccounts: string[]
}

export type Preferences = {
    theme: Theme
    themeEmployee: Theme
    hiddenAccounts: string[]
}