export const CookieName = 'XApiKey'
export const HeaderName = 'XApiKey'
export const CookieAuthTime = 60 * 24 * 60 * 60 * 1000

export type AuthInfo = {
    [HeaderName]: undefined | string
}

export class AuthData {
    private static _AuthData: AuthInfo = {
        [HeaderName]: undefined
    }

    public static get Header() {
        return this._AuthData[HeaderName] || ''
    }

    public static set Header(value: string) {
        this._AuthData[HeaderName] = value
    }
}