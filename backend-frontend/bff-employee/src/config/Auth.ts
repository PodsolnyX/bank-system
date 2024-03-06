export const CookieName = 'XApiKey'

export type AuthInfo = {
  UserId: undefined | string
}

export class AuthData {
  private static _AuthData: AuthInfo = {
    UserId: undefined,
  }

  public static get Header() {
    return this._AuthData.UserId || ''
  }

  public static set Header(value: string) {
    this._AuthData.UserId = value
  }
}
