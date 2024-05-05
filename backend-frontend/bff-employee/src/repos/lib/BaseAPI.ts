import axios, {AxiosHeaders, AxiosInstance} from 'axios'
import {AuthInfo} from "../../common/Auth";
import { v4 as uuidv4 } from 'uuid'
import axiosRetry from "axios-retry";

export abstract class BaseReq {
  protected static BASE_URL: string
  private static readonly API_HEADER_NAME = 'Authorization'
  private static readonly PREFERENCES_HEADER_NAME = 'XUserId'
  private static readonly API_IDEMPOTENCY_HEADER_NAME = 'X-Idempotency-Key'
  private static readonly API_TRACE_HEADER_NAME = 'X-TraceId'
  private static readonly SERIALIZER_INDEXES = null

  public static Req(AuthInfo: AuthInfo | null): AxiosInstance {
    const headers: Record<string, string> = AuthInfo
        ? {
          [this.API_HEADER_NAME]: AuthInfo.token,
          [this.PREFERENCES_HEADER_NAME]: AuthInfo.id,
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

    axiosRetry(AxiosInst, {
      retryCondition: (error) => error.response?.status === 500,
      retryDelay: (retryCount) => {
        return retryCount * 55
      },
      retries: 10,
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
