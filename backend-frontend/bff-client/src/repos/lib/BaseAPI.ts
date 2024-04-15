import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import { AuthInfo } from 'common/Auth'

export abstract class BaseReq {
  protected static BASE_URL: string
  private static readonly API_HEADER_NAME = 'Authorization'
  private static readonly PREFERENCES_HEADER_NAME = 'XUserId'
  private static readonly SERIALIZER_INDEXES = null

  public static Req(AuthInfo: AuthInfo | null = null): AxiosInstance {
    const headers = AuthInfo
      ? {
          [this.API_HEADER_NAME]: `Bearer ${AuthInfo.token}`,
          [this.PREFERENCES_HEADER_NAME]: AuthInfo.id,
        }
      : {}
    const AxiosInst = axios.create({
      baseURL: this.BASE_URL,
      headers,
      paramsSerializer: { indexes: this.SERIALIZER_INDEXES },
    })

    axiosRetry(AxiosInst, {
      retryDelay: (retryCount) => {
        return retryCount * 750
      },
      retries: 3,
    })

    return AxiosInst
  }
}
