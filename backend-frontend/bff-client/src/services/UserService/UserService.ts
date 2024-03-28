import { UserRepo } from 'repos/UserRepo'
import { JWT_STATUS } from './types'
import { jwtDecode } from 'jwt-decode'

class UserService {
  private _UserRepo: UserRepo

  constructor(UserRepo: UserRepo) {
    this._UserRepo = UserRepo

    this.GetAccessInfoById = this.GetAccessInfoById.bind(this)
    this.ValidateJWT = this.ValidateJWT.bind(this)
  }

  async GetAccessInfoById(id: string) {
    return await this._UserRepo.GetAccessInfoById(id)
  }

  async ValidateJWT(jwt: string | null | undefined): Promise<JWT_STATUS> {
    if (!jwt) {
      return 401
    }
    try {
      const decoded = jwtDecode(jwt)
      if (!decoded.sub || !decoded.exp || decoded.exp <= Date.now() / 1000) {
        return 401
      }

      const authData = await this.GetAccessInfoById(decoded.sub)

      if (authData.bannedAt) {
        return 403
      }

      return 200
    } catch {
      return 401
    }
  }
}

export default UserService
