import axios, { AxiosInstance } from 'axios'
import { AuthData } from 'common/Auth'

export abstract class BaseReq {
  protected static BASE_URL: string
  private static readonly API_HEADER_NAME = 'Authorization'
  private static readonly PREFERENCES_HEADER_NAME = 'XUserId'
  private static readonly SERIALIZER_INDEXES = null
  private static readonly _AxiosInst: AxiosInstance = axios.create({})

  public static get Req(): AxiosInstance {
    this._AxiosInst.defaults.baseURL = this.BASE_URL
    this._AxiosInst.defaults.headers[this.API_HEADER_NAME] = `Bearer ${AuthData.Token}`
    this._AxiosInst.defaults.headers[this.PREFERENCES_HEADER_NAME] = AuthData.Id
    this._AxiosInst.defaults.paramsSerializer = { indexes: this.SERIALIZER_INDEXES }

    return this._AxiosInst
  }
}
