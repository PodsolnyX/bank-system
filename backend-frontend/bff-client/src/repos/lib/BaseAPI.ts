import axios, { AxiosInstance } from 'axios'
import { AuthData } from 'config/Auth'

export abstract class BaseReq {
  protected static BASE_URL: string
  private static readonly HEADER_NAME = 'XApiKey'
  private static readonly _AxiosInst: AxiosInstance = axios.create({})

  public static get Req(): AxiosInstance {
    this._AxiosInst.defaults.baseURL = this.BASE_URL
    this._AxiosInst.defaults.headers[this.HEADER_NAME] = AuthData.Header

    return this._AxiosInst
  }
}
