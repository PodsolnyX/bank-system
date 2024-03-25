import { jwtDecode } from 'jwt-decode'

export type AuthInfo = {
  id: string
  token: string
}

export class AuthData {
  private static _AuthData: AuthInfo = {
    id: '',
    token: '',
  }

  public static get Id() {
    return this._AuthData.id
  }

  public static get Token() {
    return this._AuthData.token
  }

  public static set Data(token: string) {
    console.log(AuthData.Token.length)
    this._AuthData.token = token
    try {
      this._AuthData.id = JSON.parse(jwtDecode(token)).sub
    } catch {
      this._AuthData.id = ''
    }
  }
}
