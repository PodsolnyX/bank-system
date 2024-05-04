import axios, { AxiosHeaders, AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import { v4 as uuidv4 } from 'uuid'
import { ReqMetaInfo } from 'common/Auth'
import { CB, mapUrl } from 'middleware/CircuitBreaker'

export abstract class BaseReq {
  protected static BASE_URL: string
  private static readonly API_AUTH_HEADER_NAME = 'Authorization'
  private static readonly API_IDEMPOTENCY_HEADER_NAME = 'X-Idempotency-Key'
  private static readonly API_TRACE_HEADER_NAME = 'X-TraceId'

  private static readonly PREFERENCES_HEADER_NAME = 'XUserId'
  private static readonly SERIALIZER_INDEXES = null

  public static Req(AuthInfo: ReqMetaInfo | null = null): AxiosInstance {
    const headers: Record<string, string> = AuthInfo
      ? {
          [this.API_AUTH_HEADER_NAME]: `Bearer ${AuthInfo.token}`,
          [this.PREFERENCES_HEADER_NAME]: AuthInfo.id,
          [this.API_TRACE_HEADER_NAME]: AuthInfo.traceId,
        }
      : {}
    if (AuthInfo?.idempotencyKey) {
      headers[this.API_IDEMPOTENCY_HEADER_NAME] = AuthInfo.idempotencyKey
    }
    const AxiosInst = axios.create({
      baseURL: this.BASE_URL,
      headers,
      paramsSerializer: { indexes: this.SERIALIZER_INDEXES },
    })
    AxiosInst.interceptors.response.use(
      (response) => {
        const mapping = mapUrl(this.BASE_URL)
        if (mapping) {
          CB.Success(mapping)
        }
        return response
      },
      (error) => {
        const mapping = mapUrl(this.BASE_URL)
        if (mapping) {
          CB.Error(mapping)
        }
        return Promise.reject(error)
      }
    )

    axiosRetry(AxiosInst, {
      //TODO
      retryDelay: () => {
        return 75
      },
      retries: 30,
      onRetry: (_retryCount, _error, requestConfig) => {
        if (requestConfig.headers == null) {
          requestConfig.headers = new AxiosHeaders()
        }
        requestConfig.headers[this.API_TRACE_HEADER_NAME] = uuidv4()
      },
    })

    return AxiosInst
  }
}
